import './pins.scss';

import React    from 'react';
import Pin      from './pin';

class Pins extends React.Component {
    render() {
        return (
            <div className="bonbon-pins">
                { this.renderPins(this.props.data) }
            </div>
        );
    }
    renderPins(data) {
        return data.map((pin, i) => {
            return (
                <Pin
                    pin =       { i }
                    pos =       { pin }
                    key =       { 'pin-' + i }
                    cellSize =  { this.props.settings.cellSize }
                />
            );
        });
    }
}

export default Pins;