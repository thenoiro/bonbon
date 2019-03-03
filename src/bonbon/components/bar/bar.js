import './bar.scss';

import React from 'react';

class Bar extends React.Component {
    render() {
        const settings = this.props.settings;
        const data = this.props.data;

        const styles = {
            left: settings.left * settings.cellSize,
            top: settings.top * settings.cellSize,
            zIndex: settings.styles.zIndex,
            width: data[0].length * settings.cellSize + 'px',
            height: data.length * settings.cellSize + 'px'
        };
        return (
            <div className="bar" style={styles} >
                { this.renderRows() }
            </div>
        );
    }
    renderRows() {
        const settings = this.props.settings;

        return this.props.data.map((rowData, i) => {
            const rowKey = 'row' + i;
            const rowStyles = {
                top: i * settings.cellSize + 'px',
                left: '0px',
                height: settings.cellSize + 'px',
                width: '100%'
            };
            return (
                <div className="bar-row" key={rowKey} style={rowStyles}>
                    {this.renderCells(rowData, i)}
                </div>
            );
        });
    }
    renderCells(data, rowIndex) {
        const settings = this.props.settings;
        const styles = settings.styles;
        const step = settings.cellSize;

        return data.map((item, i) => {
            const cellKey = 'cell' + i;
            const visibleBorder = styles.border;
            const bar = this.props.data;
            const bgColor = styles.color;

            let borderLeft = 'none';
            let borderRight = 'none';
            let borderTop = 'none';
            let borderBottom = 'none';

            if (item) {
                if (i === 0) {
                    borderLeft = visibleBorder;
                }
                if (rowIndex === 0) {
                    borderTop = visibleBorder;
                }
                if (rowIndex === bar.length - 1) {
                    borderBottom = visibleBorder;
                }
                if (i === data.length - 1) {
                    borderRight = visibleBorder;
                }
                if (i && !data[i - 1]) {
                    borderLeft = visibleBorder;
                }
                if (i + 1 < data.length && !data[i + 1]) { 
                    borderRight = visibleBorder;
                }
                if (rowIndex) {
                    let prevRow = bar[rowIndex - 1];

                    if (!prevRow[i]) {
                        borderTop = visibleBorder;
                    }
                }
                if (rowIndex < bar.length - 1) {
                    let nextRow = bar[rowIndex + 1];

                    if (!nextRow[i]) {
                        borderBottom = visibleBorder;
                    }
                }
            }

            const cStyle = {
                top: '0px',
                left: i * step + 'px',
                width: step + 'px',
                height: step + 'px',
                backgroundColor: item ? bgColor : 'transparent',
                opacity: styles.opacity || 1,
                borderLeft,
                borderRight,
                borderTop,
                borderBottom
            };
            const cellClass = 'bar-cell cell-' + (item ? 'filled' : 'empty');

            return <div className={cellClass} style={cStyle} key={cellKey}></div>;
        });
    }
}

export default Bar;