import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import CONSTANTS from '../../constants';
import styles from './styles/index.css';

import Donald from '../donald';
import DonaldPreview from '../donald/Preview';
import Trash from '../trash';
import WhiteHouse from '../whiteHouse';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const {
    getSourceClientOffset,
  } = props;
  const { x, y } = getSourceClientOffset;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform: transform,
    WebkitTransform: transform,
  };
}

class CustomDragLayer extends Component {
  renderItem(type, item) {
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

  onDropResult(dropResult) {
    this.setState({dropResult});
  }

  onBeginDrag(dropResult) {
    this.setState({dropResult: null});
  }

  render() {
    const {
      item,
      itemType,
      isDragging,
      getSourceClientOffset,
    } = this.props;
    const { dropResult } = this.state || {};

    return (
      <div className={styles.dragLayer}>
        <Donald
          onDropResult={this.onDropResult.bind(this)}
          donaldDropped={dropResult}
          onBeginDrag={this.onBeginDrag.bind(this)}
        />
        <div className={styles.targetsWrapper}>
          <WhiteHouse donaldDropped={dropResult} />
          <Trash donaldDropped={dropResult} />
        </div>

        {isDragging && getSourceClientOffset &&
          <div style={layerStyles}>
            {this.renderItem(itemType, item)}
          </div>
        }
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    getSourceClientOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
