import React from 'react';
import {render} from 'react-dom';
import {Field} from 'react-final-form';
import './App.css';
import Wizard from './components/Wizard';
import Error from './components/Error';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
