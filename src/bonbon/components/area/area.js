import './area.scss';

import React    from 'react';
import Bar      from '../bar/bar';
import mut      from '../../helpers/mut';

class Area extends React.Component {
    render() {
        const areaConfig = {
            top:    0,
            left:   0,
            styles: {
                border:     '3px solid white',
                color:      'rgba(255, 255, 255, 0.5)',
                opacity:    0.8,
                zIndex:     3
            }
        };
        return (
            <div className="area">
                <div className="area-bar">
                    <Bar
                        data =      { this.props.data }
                        settings =  { mut(areaConfig, this.props.settings) }
                    />
                </div>
                { this.props.children }
            </div>
        );
    }
}

export default Area;