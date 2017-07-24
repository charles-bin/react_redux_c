import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Root from './containers/Root'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
registerServiceWorker();

let a = 1, b = 1, c;
for(let x = 0; x < 100; x++) {
  c = a + b;
  a = b;
  b = c;
  console.log(c)
}
