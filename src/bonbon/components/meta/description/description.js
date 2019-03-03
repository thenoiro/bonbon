import './description.scss';
import React from 'react';
import BonbonImage from '../../../images/bonbon.png';

class Description extends React.PureComponent {
    render() {
        return (
            <div className="bonbon-description">
                <div className="description-image">
                    <img src={ BonbonImage } alt="Bonbon puzzle" />
                </div>
                <div className="description-content">
                    There are two mazes, one on top of the other. Five pins fit into the mazes. By sliding the mazes back and forth, the pins can be moved through the mazes to the exit. All five pins must be navigated through pth mazes in order to solve the puzzle and separate the two sliding pieces.
                </div>
            </div>
        );
    }
}

export default Description;