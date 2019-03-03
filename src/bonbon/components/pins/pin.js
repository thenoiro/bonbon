import React from 'react';
import Bar from '../bar/bar';

class Pin extends React.Component {
    render() {
        const data = [[1]];
        const leftPos = 31 + 3 + (this.props.pin * 6);
        const topPos = 1 + this.props.pos;
        const settings = {
            left:   leftPos,
            top:        topPos,
            cellSize:   this.props.cellSize,
            styles: {
                zIndex: 5,
                color:  'white'
            }
        };
        return <Bar data={ data } settings={ settings } />;
    }
}

export default Pin;