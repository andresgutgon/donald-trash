import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import CONSTANTS from '../../constants';
import styles from './styles/index.css';

class WhiteHouse extends Component {
  getClasses() {
    const { isOver, donaldDropped } = this.props;
    if (donaldDropped && donaldDropped.target === 'whiteHouse') return styles.donaldInWhiteHouse;
    return isOver ? styles.whiteHouseOver : styles.whiteHouse;
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={this.getClasses()}>
        <img src={require('./white-house.jpg')} />
      </div>
    );
  }
}

const dragTargetSpec = {
  drop(props, monitor) {
    return {
      position: monitor.getSourceClientOffset(),
      target: 'whiteHouse',
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(CONSTANTS.DRAGSOURCE_TYPES.BAD_PERSON, dragTargetSpec, collect)(WhiteHouse);
