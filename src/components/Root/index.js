import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
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

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Root);
