import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import AuthUserContext from './AuthUserContext'
import SignOutButton from './SignOut'
import * as routes from '../constants/routes'

const Navigation = ({ authUser }) => 
    <header>
        {authUser ?
            <div>
                <h1 id="app-title"><Link to={routes.LANDING}>The Endless Hunt</Link></h1>
                <NavigationAuth />
            </div>
            :
            <div>
                <h1 id="app-title"><Link to={routes.LANDING}>The Endless Hunt</Link></h1>
                <NavigationNonAuth />
            </div>
        }
    </header>

const NavigationAuth = () => 
    <ul className="main-nav">
        <li><Link to={routes.HOME}>Users</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><Link to={routes.PROFILE}>Profile</Link></li>
        <li><SignOutButton /></li>
    </ul>

const NavigationNonAuth = () => 
    <ul className="main-nav">
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
    </ul>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });
  
  export default connect(mapStateToProps)(Navigation);
