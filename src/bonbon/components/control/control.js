import './control.scss';
import React from 'react';

class Control extends React.Component {
    constructor(props) {
        super(props);
        this.rootElement = React.createRef();
    }
    render() {
        return (
            <div
                className=  {this.props.className + ' game-control'}
                ref=        {this.rootElement}
                onKeyDown=  {this.handleKeyPress}
                tabIndex=   "0"
            >
                { this.props.children }
            </div>
        );
    }

    handleKeyPress = (e) => {
        const key = this.getKeyByCode(e.keyCode);

        switch (key) {
            case 'SHIFT':     return this.props.onChangeBarsOrder();

            case 'Q': case 'A':     return this.props.onPinMove(0, key === 'Q');
            case 'W': case 'S':     return this.props.onPinMove(1, key === 'W');
            case 'E': case 'D':     return this.props.onPinMove(2, key === 'E');
            case 'R': case 'F':     return this.props.onPinMove(3, key === 'R');
            case 'T': case 'G':     return this.props.onPinMove(4, key === 'T');

            case 'num4': case 'num6':   return this.props.onBarMove(1, key === 'num4');
            case 'num1': case 'num3':   return this.props.onBarMove(2, key === 'num1');

            case 'arrowLeft': case 'arrowRight':    return this.props.onBarMove(null, key === 'arrowLeft');

            default: return;                
        }
    }
    getKeyByCode(code) {
        switch (code) {
            // case 9:     return 'TAB';
            case 16:    return 'SHIFT';
            case 81:    return 'Q';
            case 65:    return 'A';
            case 87:    return 'W';
            case 83:    return 'S';
            case 69:    return 'E';
            case 68:    return 'D';
            case 82:    return 'R';
            case 70:    return 'F';
            case 84:    return 'T';
            case 71:    return 'G';
            case 100:   return 'num4';
            case 102:   return 'num6';
            case 97:    return 'num1';
            case 99:    return 'num3';
            case 37:    return 'arrowLeft';
            case 39:    return 'arrowRight';
            default:    return null;
            // default:    return console.log(code);
        }
    }

    componentDidMount() {
        this.rootElement.current.focus();
    }
}

export default Control;