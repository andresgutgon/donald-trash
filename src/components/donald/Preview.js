import React, { Component } from 'react';

import styles from './styles/index.css';

class DonaldPreview extends Component {
  getClasses() {
    const { isDragPreview } = this.props;
    return isDragPreview ? styles.donaldDragPreview : styles.donald;
  }

  render() {
    const { inlineStyles } = this.props;

    return (<div style={inlineStyles} className={this.getClasses()} />);
  }
}

export default DonaldPreview;
