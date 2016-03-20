import React, { Component } from 'react';

import styles from './styles/index.css';

class Root extends Component {
  constructor() {
    super();
    this._handleEditingToggle = this._handleEditingToggle.bind(this);
  }

  render() {

    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Header editing={editing} onToggle={this._handleEditingToggle} />
          <ul className={styles.metrics}>
            {this.renderMetrics()}
            <MetricButton createMetric={createMetric}/>
          </ul>
        </div>
      </div>
    );
  }
}

export default Root;
