import React from 'react';
import { BrowserRouter as Router,
         Route,
         } from 'react-router-dom'
import '../styles/App.css'

import Navigation from './Navigation'
import Dashboard from './Dashboard'
import PasswordForget from './PasswordForget'
import SignUpForm from './SignUpForm'
import SignIn from './SignIn'
import HomePage from './Home'
import withAuthentication from './withAuthentication'

import * as routes from '../constants/routes'

const App = () => 
  <Router>
  <div>
    <Navigation />
    <div className="main-wrap">
      <Route
        exact path={routes.LANDING}
        component={() => <SignIn />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpForm />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignIn />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForget />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <Dashboard />}
      />
      <Route
        exact path={routes.HOME}
        component={() => <HomePage />}
      />
    </div>
  </div>
  </Router>

export default withAuthentication(App);
