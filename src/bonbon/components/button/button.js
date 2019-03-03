import './button.scss';
import React from 'react';

class Button extends React.Component {
    render() {
        const buttonStyles = { backgroundColor: this.props.color };

        return (
            <button className="bonbon-button" tabIndex="0" style={ buttonStyles } onClick={ this.handleClick } >
                <div className="button-overlay">
                    { this.props.children }
                </div>
            </button>
        );
    }
    handleClick = () => {
        this.props.whenClick();
    }
}

export default Button;