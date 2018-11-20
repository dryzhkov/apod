import * as React from 'react';
import './App.css';

import logo from './logo.svg';

import AstronomyViewer from './AstroViewer';
import NetworkInfo from './NetworkInfo';

import { unregister } from './registerServiceWorker';

class App extends React.Component {
  constructor(props: {}) {
    super(props);
    this.unregisterSW = this.unregisterSW.bind(this);
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Today is {new Date().toDateString()}</h1>
        </header>
        <NetworkInfo />
        <AstronomyViewer />
        <button onClick={this.unregisterSW}>Unregister service worker</button>
      </div>
    );
  }

  private unregisterSW() {
    unregister();
  }
}

export default App;
