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
    const { connectDropTarget, donaldDropped } = this.props;
    const dropped = donaldDropped && donaldDropped.target === 'whiteHouse';

    return connectDropTarget(
      <div className={this.getClasses()}>
        {dropped &&
         <div className={styles.message}>
          You must be a troll! <img src={require('./trollface.png')} />
         </div>
        }
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
