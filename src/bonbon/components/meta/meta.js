import './meta.scss';
import React                from 'react';
import Description          from './description/description';
import ControlInformation   from './controlInformation/controlInformation';

class Meta extends React.Component {
    render() {
        return (
            <div className="bonbon-meta">
                <Description />
                <ControlInformation />
            </div>
        );
    }
}

export default Meta;