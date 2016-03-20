require("font-awesome-webpack");

import React from 'react';
import { render } from 'react-dom';

import Root from './Root';

const div = document.createElement('div');
document.body.appendChild(div);

render(<Root />, div);
