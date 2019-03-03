import './controlInformation.scss';

import React    from 'react';
import Key      from './keyButton/keyButton';
import Table    from '../../../helpers/table';

import { FontAwesomeIcon as Fa }   from '@fortawesome/react-fontawesome';

import {
    faArrowLeft     as ArrowLeft,
    faArrowRight    as ArrowRight,
    faArrowUp       as ArrowUp,
    faArrowDown     as ArrowDown
} from '@fortawesome/free-solid-svg-icons';


class ControlInformation extends React.Component {
    render() {
        return (
            <div className="bonbon-control-info">
                <div className="control-part pins-control">
                    <Table.Body>
                        <Table.Row head={ true } >
                            <>Pin:</>
                            { this.renderFragments.apply(this, '12345'.split('')) }
                        </Table.Row>
                        <Table.Row>
                            <Fa icon={ ArrowUp } />
                            { this.renderKeys.apply(this, 'QWERT'.split('')) }
                        </Table.Row>
                        <Table.Row>
                            <Fa icon={ ArrowDown } />
                            { this.renderKeys.apply(this, 'ASDFG'.split('')) }
                        </Table.Row>
                    </Table.Body>
                </div>
                <div className="control-part bars-control">
                    <Table.Body>
                        <Table.Row head={ true } >
                            <div className="minor">digital<br />keyboard</div>
                            <Fa icon={ ArrowLeft } />
                            <></>
                            <Fa icon={ ArrowRight } />
                        </Table.Row>
                        <Table.Row>
                            <>Red bar</>
                            <Key>4</Key>
                            <Key dis={ true }>5</Key>
                            <Key>6</Key>
                        </Table.Row>
                        <Table.Row>
                            <>Blue bar</>
                            <Key>1</Key>
                            <Key dis={ true }>2</Key>
                            <Key>3</Key>
                        </Table.Row>
                    </Table.Body>
                </div>
                <div className="control-part toggle-bars">
                    <div className="control-part-header">Toggle bars</div>
                    <div style={{ marginTop: '30px' }}>
                        <Key><Fa icon={ ArrowUp } />&#160;Shift&#160;&#160;&#160;</Key>
                    </div>
                </div>
                <div className="control-part arrows-control">
                    <div className="control-part-header">Control bar on the top</div>
                    <Table.Body>
                        <Table.Row>
                            <></>
                            <></>
                            <Key dis={ true } ><Fa icon={ ArrowUp } /></Key>
                            <></>
                        </Table.Row>
                        <Table.Row>
                            <></>
                            <Key><Fa icon={ ArrowLeft } /></Key>
                            <Key dis={ true } ><Fa icon={ ArrowDown } /></Key>
                            <Key><Fa icon={ ArrowRight } /></Key>
                        </Table.Row>
                    </Table.Body>
                </div>
            </div>
        );
    }
    renderFragments(...content) {
        return content.map((c, index) => {
            return <React.Fragment key={ index } >{ c }</React.Fragment>;
        });
    }
    renderKeys(...keys) {
        return keys.map((k, index) => {
            return <Key key={ `key-${index}` } >{ k }</Key>;
        });
    }
}

export default ControlInformation;