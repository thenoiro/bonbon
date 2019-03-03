import './keyButton.scss';
import React from 'react';

class KeyButton extends React.Component {
    render() {
        let classname = 'key-button';

        if (this.props.dis) {
            classname += ' dis';
        }
        return (
            <button className={ classname } onClick={ this.handleClick } >
                { this.props.children }
            </button>
        );
    }
    handleClick = () => {
        if (this.props.whenClick) {
            this.props.whenClick();
        }
    }
}

export default KeyButton;