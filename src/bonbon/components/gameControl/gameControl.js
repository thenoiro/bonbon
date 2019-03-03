import './gameControl.scss';
import React    from 'react';
import Button   from '../button/button';

class GameControl extends React.PureComponent {
    render() {
        return (
            <div className="bonbon-game-control">
                { this.renderButton('Restart game', 'green',    this.props.onRestart)   }
                {
                    this.props.solving
                        ? this.renderButton('Stop solving', 'red',      this.props.onStop)
                        : this.renderButton('Solve puzzle', 'orange',   this.props.onSolve)
                }
            </div>
        );
    }
    renderButton(content, color, callback) {
        return (
            <Button
                color =         { color }
                whenClick =     { callback }
            >
                { content }
            </Button>
        );
    }
}

export default GameControl;