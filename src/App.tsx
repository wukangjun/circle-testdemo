import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router,
  HashRouter,
  Link,
  NavLink,
  Route,
  MemoryRouter,
  Prompt,
  Redirect,
  StaticRouter,
  Switch,
  generatePath,
  matchPath,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  withRouter
 } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Manager from './pages/Manager'
import Paint from './pages/Paint'

/**
 * @automating-route: /home
 */
function App() {
  useEffect(() => {
    window.onpopstate = function(hash: PopStateEvent) {
      console.log(hash)
    }
    
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Switch>
            <Route path="/m">
              <Manager />
            </Route>
            <Route path="/p">
              <Paint />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
