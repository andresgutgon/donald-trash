import React, { Component } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';

import CONSTANTS from '../../constants';
import styles from './styles/index.css';
import DonaldPreview from './Preview';

class Donald extends Component {
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0 : 1;

    const style = {
      opacity,
      display: 'inline-block',
    };

    return connectDragSource(
        <div style={style}><DonaldPreview /></div>
    );
  }
}

const dragSourceSpec = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(CONSTANTS.DRAGSOURCE_TYPES.BAD_PERSON, dragSourceSpec, collect)(Donald);
