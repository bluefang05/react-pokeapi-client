import React from "reactn";
import {Router, Switch, Route } from  "react-router-dom";
import Uikit from "uikit";
import '../node_modules/uikit/dist/css/uikit.min.css';
import '../node_modules/uikit/dist/js/uikit.min.js';
import UikitIcons from  '../node_modules/uikit/dist/js/uikit-icons.min.js';
import history from "./browserHistory";
import Home from "./Container/Home/Home";
import './App.reducers';

Uikit.use(UikitIcons);

function App() {
  return (
    <Router history={history}>
    <div className="App">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>        
    </div>
  </Router>
  );
}

export default App;
