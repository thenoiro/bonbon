import './bonbon.scss';
import React        from 'react';
import config       from './config';
import Game         from './components/game/game';
import Control      from './components/control/control';
import Message      from './components/message/message';
import GameControl  from './components/gameControl/gameControl';
import Meta         from './components/meta/meta';

class Bonbon extends React.Component {
    constructor() {
        super();

        this.state = this.getInitState();
        this.bar1 = config.bar1;
        this.bar2 = config.bar2;

        this.onChangeBarsOrder = this.onChangeBarsOrder.bind(this);

        this.onPinMove = this.onPinMove.bind(this);
        this.onBarMove = this.onBarMove.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.solvePuzzle = this.solvePuzzle.bind(this);
        this.stopSolving = this.stopSolving.bind(this);

        this.movesHistory = {};
    }
    render() {
        const isPossible = this.isPossibleConfiguration({ ...this.state });

        if (!isPossible) {
            console.error('Error: Unable to render configuration.', this.state);
            return <div className="bonbon fail">Error: Unable to render configuration</div>;
        }
        const barsConfig = this.getConfig();

        return (
            <Control className="bonbon"
                onChangeBarsOrder = { this.onChangeBarsOrder }
                onPinMove =         { this.onPinMove         }
                onBarMove =         { this.onBarMove         }
            >
                <Message
                    message = { this.state.message }
                />
                <Game
                    area =      { config.area     }
                    bars =      { barsConfig      }
                    bar1 =      { this.bar1       }
                    bar2 =      { this.bar2       }
                    pins =      { this.state.pins }
                    cellSize =  { config.cellSize }
                />
                <GameControl
                    solving =   { this.state.solving }
                    onRestart = { this.restartGame }
                    onSolve =   { this.solvePuzzle }
                    onStop =    { this.stopSolving }
                />
                <Meta />
            </Control>
        );
    }
    getInitState() {
        return {
            bar2pos:    31,
            bar1pos:    31,
            bar1index:  1,
            bar2index:  2,
            pins:       [0, 0, 0, 0, 0],
            message:    null,
            solving:    false,
            tic:        0
        };
    }
    getConfig() {
        return {
            bar1config: {
                left: this.state.bar1pos,
                styles: {
                    border: '1px solid #f99',
                    color: 'red',
                    zIndex: this.state.bar1index
                }
            },
            bar2config: {
                left: this.state.bar2pos,
                styles: {
                    border: '1px solid #99f',
                    color: 'blue',
                    zIndex: this.state.bar2index
                }
            }
        };
    }
    solvePuzzle() {
        this.showMessage({
            type: 'info',
            message: 'Could take about 10 minutes... You can stop it any time and continue solving.'
        });
        this.startSolving();
    }
    stopSolving() {
        this.setState({ solving: false });
    }
    restartGame() {
        this.setState(this.getInitState());
    }
    showMessage(message) {
        this.setState({ message });
    }
    hideMessage() {
        this.setState({ message: null });
    }
    wrongMoveMessage() {
        this.showMessage({
            type:       'error',
            message:    'Unable to move in this way.',
            timer:      3000,
            callback:   this.hideMessage.bind(this)
        });
    }
    getTopBarIndex() {
        return this.state.bar1index > this.state.bar2index ? 1 : 2;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.message && prevState.message === this.state.message && !this.state.solving) {
            this.setState({ message: null });
        }
    }

    onBarMove(barIndex, toLeft) {
        barIndex = barIndex || this.getTopBarIndex();

        const barPositionPropertyName = `bar${barIndex}pos`;
        const currentState = Object.assign({}, this.state);

        currentState[barPositionPropertyName] = toLeft ? this.state[barPositionPropertyName] - 1 : this.state[barPositionPropertyName] + 1;
        const isPossible = this.isPossibleConfiguration(currentState);

        if (!isPossible) {
            return this.wrongMoveMessage();
        }
        this.setState(currentState);
    }
    onChangeBarsOrder() {
        const bar1index = this.state.bar2index;
        const bar2index = this.state.bar1index;

        this.setState({ bar1index, bar2index });
    }
    onPinMove(pinIndex, toTop) {
        const pins = this.state.pins.slice(0);
        const currentPin = pins[pinIndex];

        pins[pinIndex] = toTop ? currentPin - 1 : currentPin + 1;
        const isPossible = this.isPossibleConfiguration(Object.assign({}, this.state, { pins }));

        if (!isPossible) {
            return this.wrongMoveMessage();
        }
        this.setState({ pins });
    }

    isPossibleConfiguration({pins, bar1pos, bar2pos}) {
        return pins.every((pos, pinIndex) => {
            const pinX = 31 + 3 + (pinIndex * 6);
            const pinY = 1 + pos;
            
            if (bar1pos < 0 || bar1pos > 62 || bar2pos < 0 || bar2pos > 62) {
                return false;
            }
            const barValues = [
                this.checkCellValue(this.bar1, bar1pos, pinX, pinY),
                this.checkCellValue(this.bar2, bar2pos, pinX, pinY)
            ];
            return barValues.every(item => !item);
        });
    }
    checkCellValue(bar, pos, x, y) {
        const coord = x - pos;

        if (coord < 0 || coord > bar[y].length) {
            return false;
        }
        return Boolean(bar[y][coord]);
    }


    startSolving = () => {
        const tic = this.state.tic;
        const self = this;

        this.movesHistory = {};
        this.setState({ solving: true });

        setTimeout(() => {
            this.tryMove()
                .then(() => {
                    self.showMessage({
                        type: 'success',
                        message: 'Done!'
                    });
                    this.setState({ solved: true });
                })
                .catch((e) => {
                    console.error(e);
                    this.showMessage({
                        type: 'error',
                        message: 'Fail...'
                    });
                });
        }, tic);
    }
    tryMove(lev = 0) {
        const state = this.state;

        return new Promise((resolveLevel, rejectLevel) => {
            this.refreshLine();

            const movesList = this.getMoves().map(move => this.getMove(move));
            const moves = movesList.map((move, i) => {
                return () => {
                    return new Promise((resolveMove, rejectMove) => {
                        move.do()
                            .then(() => {
                                if (this.isResolved()) {
                                    return resolveMove();
                                }
                                this.tryMove(lev ? lev + 1 : 1)
                                    .then(resolveMove)
                                    .catch(ex => {
                                        move.undo()
                                            .then(rejectMove);
                                    });
                            })
                            .catch(ex => {
                                move.undo().then(rejectMove);
                            });
                    });
                }
            });
            doMove(0);

            function doMove(i) {
                const nextMove = moves[i];

                if (!state.solving) {
                    return;
                }
                if (nextMove) {
                    return nextMove()
                        .then(() => {
                            if (movesList[i].type === 'bar') {
                                movesList[i].log();
                            }
                            resolveLevel();
                        })
                        .catch(ex => {
                            doMove(i + 1);
                        });
                }
                rejectLevel();
            }
        });
    }
    refreshLine() {
        this.line = [
            {element: this.bar1, name: 'bar1', position: this.state.bar1pos, goal: 0},
            {element: this.bar2, name: 'bar2', position: this.state.bar2pos, goal: 62},
            {element: this.pins, name: 'pin0', position: this.state.pins[0], goal: 4},
            {element: this.pins, name: 'pin1', position: this.state.pins[1], goal: 4},
            {element: this.pins, name: 'pin2', position: this.state.pins[2], goal: 4},
            {element: this.pins, name: 'pin3', position: this.state.pins[3], goal: 4},
            {element: this.pins, name: 'pin4', position: this.state.pins[4], goal: 4},
        ];
    }
    getMoves() {
        const moves = [];

        this.tryMoveBar(1).forEach(move => moves.push(move));
        this.tryMoveBar(2).forEach(move => moves.push(move));
        this.tryMovePin(0).forEach(move => moves.push(move));
        this.tryMovePin(1).forEach(move => moves.push(move));
        this.tryMovePin(2).forEach(move => moves.push(move));
        this.tryMovePin(3).forEach(move => moves.push(move));
        this.tryMovePin(4).forEach(move => moves.push(move));

        return moves.filter(move => move.possibility);
    }
    tryMoveBar(i) {
        const name = 'bar' + i;
        const forward = this.tryMoveElementTo(name, true);
        const backward = this.tryMoveElementTo(name, false);

        return [{
            name,
            index: i,
            type: 'bar',
            direction: true,
            possibility: forward
        }, {
            name,
            index: i,
            type: 'bar',
            direction: false,
            possibility: backward
        }];
    }
    tryMoveElementTo(name, dir, pinIndex = false) {
        const line = this.line.map(item => Object.assign({}, item));

        const elementObject = getElement(name);
        const goal = elementObject.goal;
        const position = elementObject.position;
        const move = position > goal
            ? (dir ? position - 1 : position + 1)
            : (dir ? position + 1 : position - 1);
        
        elementObject.position = move;

        const pins = new Array(5).fill(null).map((item, i) => getElement('pin' + i).position);
        const bar1pos = getElement('bar1').position;
        const bar2pos = getElement('bar2').position;

        let isPossibleMove = false;

        if (pinIndex !== false) {
            if (this.pinInRange(pinIndex, bar1pos, bar2pos)) {
                isPossibleMove = this.isPossibleConfiguration({ pins, bar1pos, bar2pos });
            }
        } else if (goal !== position) {
            isPossibleMove = this.isPossibleConfiguration({ pins, bar1pos, bar2pos });
        }
        return isPossibleMove;        
        
        function getElement(name) {
            return line.filter(item => item.name === name)[0];
        }
    }
    tryMovePin(i) {
        const name = 'pin' + i;
        const forward = this.tryMoveElementTo(name, true, i);
        const backward = this.tryMoveElementTo(name, false, i);

        return [{
            name,
            index: i,
            type: 'pin',
            direction: true,
            possibility: forward
        }, {
            name,
            index: i,
            type: 'pin',
            direction: false,
            possibility: backward
        }];
    }
    pinInRange(pinIndex, bar1pos, bar2pos) {
        const pinPos = 31 + 3 + (pinIndex * 6);
        const leftBar = Math.min(bar1pos, bar2pos);
        const rightBar = Math.max(bar1pos, bar2pos);

        return pinPos < leftBar + 31 || pinPos > rightBar;
    }
    getMove(move) {
        let newState = {};
        let prevState = {};
        let prevPosition;
        let newPosition;
        let moveName;

        const tic = this.state.tic;
        const logData = this.state.pins.slice(0);

        if (move.type === 'pin') {
            const pins = this.state.pins.slice(0);
            prevState.pins = this.state.pins.slice(0);
            prevPosition = pins[move.index];
            newPosition = move.direction ? pins[move.index] + 1 : pins[move.index] - 1;
            pins[move.index] = newPosition;
            newState.pins = pins;
        } else {
            const barObject = this.line.filter(item => item.name === move.name)[0];
            moveName = move.name + 'pos';

            prevPosition = this.state[moveName];
            newPosition = move.direction
                ? (barObject.goal > prevPosition ? prevPosition + 1 : prevPosition - 1)
                : (barObject.goal > prevPosition ? prevPosition - 1 : prevPosition + 1);

            newState[moveName] = newPosition;
            prevState[moveName] = prevPosition;
        }

        move.do = () => {
            return new Promise((resolve, reject) => {
                const expectedState = Object.assign(this.state, newState);
                const expectedMoveStamp = this.getStateStamp(expectedState);

                if (this.movesHistory[expectedMoveStamp]) {
                    return reject();
                }
                this.setState(newState);
                this.recordState();

                setTimeout(() => resolve(), tic);
            });
        }
        move.undo = () => {
            return new Promise((resolve, reject) => {
                move.wasUndo = true;
                this.setState(prevState);
                setTimeout(() => resolve(), tic);
            });
        }
        move.log = () => {
            if (move.type === 'bar' && !move.wasUndo) {
                const localDirection = move.name === 'bar1'
                    ? (move.direction ? 'left' : 'right')
                    : (move.direction ? 'right' : 'left');

                const moveId = move.name === 'bar1' ? ' (red)' : ' (blue)';
                console.log(move.name + moveId + ' move to the ' + localDirection + '. Pins: ', logData);
            }
        }
        return move;
    }
    getStateStamp(state) {
        const actualState = state || this.state;
        return 'move-' + actualState.pins.join('-') + '-' + actualState.bar1pos + '-' + actualState.bar2pos;
    }
    recordState() {
        this.movesHistory[this.getStateStamp()] = true;
    }
    isResolved() {
        const self = this;
        return this.state.bar1pos === getElement('bar1').goal && this.state.bar2pos === getElement('bar2').goal;

        function getElement(name) {
            return self.line.filter(e => e.name === name)[0];
        }
    }
}

export default Bonbon;