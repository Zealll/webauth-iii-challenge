import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute.js'

import Login from './auth/Login.js'
import SignUp from './auth/SignUp.js'
import Users from './users/Users'
import NavBar from './users/NavBar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <PrivateRoute exact path='/userslist' component={Users} />
      </div>
    );
  }
}

export default App;
