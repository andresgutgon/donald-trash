import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import CONSTANTS from '../../constants';
import styles from './styles/index.css';

import Donald from '../donald';
import DonaldPreview from '../donald/Preview';
import Trash from '../trash';
import WhiteHouse from '../whiteHouse';

function getItemStyles(props) {
  const {
    getSourceClientOffset,
    getDifferenceFromInitialOffset,
  } = props;
  const { x, y } = getSourceClientOffset;

  // let yPosition = getSourceClientOffset.y;
  // if (getDifferenceFromInitialOffset.x) {
  //   yPosition = yPosition - 100;
  // }

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform: transform,
    WebkitTransform: transform,
    zIndex: 1,
    position: 'relative',
  };
}

class CustomDragLayer extends Component {
  renderItem(type, item) {
    const { currentOffset, getDifferenceFromInitialOffset } = this.props;
    const { DRAGSOURCE_TYPES: { BAD_PERSON } } = CONSTANTS;
    switch (type) {
    case BAD_PERSON:
      return (
        <DonaldPreview
        inlineStyles={getItemStyles(this.props)}
          isDragPreview={true}
        />
      );
    }
  }

  render() {
    const {
      item,
      itemType,
      isDragging,
      getSourceClientOffset,
    } = this.props;

    // {this.renderItem('BAD_PERSON', item)}
    return (
      <div className={styles.dragLayer}>
        <Donald />
        {isDragging && getSourceClientOffset && this.renderItem(itemType, item)}
        <div style={{position: 'absolute', top: 120, right: 0, left: 0}}>
          <Trash />
          <WhiteHouse />
        </div>

      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    getClientOffset: monitor.getClientOffset(),
    getInitialClientOffset: monitor.getInitialClientOffset(),
    getInitialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    getSourceClientOffset: monitor.getSourceClientOffset(),
    getDifferenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
