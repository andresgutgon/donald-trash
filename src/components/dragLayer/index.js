import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import CONSTANTS from '../../constants';
import styles from './styles/index.css';

import Donald from '../donald';
import DonaldPreview from '../donald/Preview';
import Trash from '../trash';
import WhiteHouse from '../whiteHouse';

function getItemStyles(currentOffset) {
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform: transform,
    WebkitTransform: transform,
    zIndex: 1,
    position: 'relative',
    cursor: 'move',
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
        inlineStyles={getItemStyles(getDifferenceFromInitialOffset)}
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
      currentOffset,
      getDifferenceFromInitialOffset,
    } = this.props;

    return (
      <div className={styles.dragLayer}>
        <Donald />
        {isDragging && getDifferenceFromInitialOffset && this.renderItem(itemType, item)}
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
    currentOffset: monitor.getSourceClientOffset(),
    getDifferenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
