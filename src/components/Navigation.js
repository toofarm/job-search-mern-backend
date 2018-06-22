import React from 'react'
import { Link } from 'react-router-dom'

import AuthUserContext from './AuthUserContext'
import SignOutButton from './SignOut'
import * as routes from '../constants/routes'

const Navigation = ({ authUser }) => 
    <AuthUserContext.Consumer>
        {authUser => authUser ?
            <header>
                <h1 id="app-title"><Link to={routes.ACCOUNT}>The Endless Hunt</Link></h1>
                <NavigationAuth />
            </header>
            :
            <header>
                <h1 id="app-title"><Link to={routes.SIGN_IN}>The Endless Hunt</Link></h1>
                <NavigationNonAuth />
            </header>
        }
    </AuthUserContext.Consumer>

const NavigationAuth = () => 
    <ul className="main-nav">
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><SignOutButton /></li>
    </ul>

const NavigationNonAuth = () => 
    <ul className="main-nav">
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
    </ul>

export default Navigation;
