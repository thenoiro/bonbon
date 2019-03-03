import './game.scss';

import React    from 'react';
import Area     from '../area/area';
import Bar      from '../bar/bar';
import Pins     from '../pins/pins';
import mut      from '../../helpers/mut';

class Game extends React.Component {
    render() {
        const bars = this.props.bars;
        const additionalConfig = { cellSize: this.props.cellSize };
        const gameStyles = {
            height:         (this.props.cellSize * this.props.area.length) + 'px',
            marginTop:      this.props.cellSize + 'px',
            marginBottom:   this.props.cellSize + 'px'
        };
        
        return (
            <div className="bonbon-game-container" style={ gameStyles } >
                <Area
                    data =      { this.props.area }
                    settings =  { additionalConfig }
                >
                    <Bar
                        data =      { this.props.bar1 }
                        settings =  { mut(bars.bar1config, additionalConfig, { top: 0 }) }
                    />
                    <Bar
                        data =      { this.props.bar2 }
                        settings =  { mut(bars.bar2config, additionalConfig, { top: 0 }) }
                    />
                    <Pins
                        data =      { this.props.pins }
                        settings =  { additionalConfig }
                    />
                </Area>
            </div>
        );
    }
}

export default Game;