import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import CONSTANTS from '../../constants';
import styles from './styles/index.css';

class Trash extends Component {
  getClasses() {
    const { isOver, donaldDropped } = this.props;
    if (donaldDropped && donaldDropped.target === 'trash') return styles.donaldInTrash;
    return isOver ? styles.trashOver : styles.trash;
  }

  render() {
    const { connectDropTarget, donaldDropped } = this.props;
    const dropped = donaldDropped && donaldDropped.target === 'trash';

    console.log('dropped', dropped);

    return connectDropTarget(
      <div className={this.getClasses()}>
        {dropped &&
          <div className={styles.message}>
            Thanks! <img src={require('./clap.png')} />
          </div>
        }
        <img src={require('./trash.png')} />
      </div>
    );
  }
}

const dragTargetSpec = {
  drop(props, monitor) {
    return {
      position: monitor.getSourceClientOffset(),
      target: 'trash',
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(
  CONSTANTS.DRAGSOURCE_TYPES.BAD_PERSON,
  dragTargetSpec,
  collect
)(Trash);
