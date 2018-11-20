import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

const killSwitchFlag = new URLSearchParams(window.location.search).get('killswitch');
killSwitchFlag ? registerServiceWorker('noop-sw.js') : registerServiceWorker();