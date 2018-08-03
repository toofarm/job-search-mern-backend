import React from 'react';
import { BrowserRouter as Router,
         Route,
         } from 'react-router-dom'
import '../styles/App.css'

import Navigation from './Navigation'
import Dashboard from './Dashboard'
import Profile from './Profile'
import PasswordForget from './PasswordForget'
import SignUpForm from './SignUpForm'
import SignIn from './SignIn'
import HomePage from './Home'
import withAuthentication from './withAuthentication'
import AuthUserContext from './AuthUserContext'

import * as routes from '../constants/routes'

const App = ({ authUser }) => 
  <Router>
  <div>
    <Navigation />
    <div className="main-wrap">
      <Route
        exact path={routes.LANDING}
        component={(authUser) => authUser ? 
        <Dashboard /> : 
        <SignIn />}
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
      <Route
        exact path={routes.PROFILE}
        component={() => <Profile />}
      />
    </div>
  </div>
  </Router>

export default withAuthentication(App);
