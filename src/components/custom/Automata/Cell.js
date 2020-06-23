import React from 'react';
import { CELL_SIZE } from './constants';
class Cell extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {

        const { x, y, status } = this.props;

        return (
            <div className={"Cell " + status.age + "_" + status.condition} style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
    }
}

export default Cell;