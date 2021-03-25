import React from 'react';
import './App.css';
import Home from '../src/Components/HomePage/HomePage'
import FullWidthTabs from '../src/Components/HomePage/Dashboard'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'




function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Dashboard" component={FullWidthTabs} />
          
          <Route path="/" component={Home} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
