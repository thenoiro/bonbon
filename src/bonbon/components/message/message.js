import './message.scss';
import React from 'react';

class Message extends React.Component {
    render() {
        const message = this.props.message;
        const isVisible = message;

        if (!isVisible) {
            return <div className={`bonbon-message hidden`}></div>;
        }
        return (
            <div className={ `bonbon-message ${message.type}`}>
                { message.message }
            </div>
        );
    }

    componentDidUpdate() {
        const message = this.props.message;

        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        if (message && message.timer && message.callback) {
            this.timerId = setTimeout(message.callback, message.timer);
        }
    }
}

export default Message;