import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import styles from './styles/index.css';

import DragLayer from '../dragLayer';

class Root extends Component {
  render() {
    return (
      <div className={styles.app}>
        <DragLayer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Root);
