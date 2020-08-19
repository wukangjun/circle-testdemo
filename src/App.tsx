import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import RouterConfiguration from './router'

/**
 * @automating-route: /home
 */
function App() {
  

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            兽人永不为奴!!!
          </p>
          <RouterConfiguration />
        </header>
      </div>
    </Router>
  );
}

export default App;
