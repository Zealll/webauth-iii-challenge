import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import Login from './auth/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Login} />
      </div>
    );
  }
}

export default App;
