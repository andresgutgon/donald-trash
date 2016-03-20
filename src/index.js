require("font-awesome-webpack");

import React from 'react';
import { render } from 'react-dom';

import Root from './components/Root';

const div = document.createElement('div');
document.body.appendChild(div);

render(<Root />, div);
