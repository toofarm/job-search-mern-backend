import React, { Component } from 'react';
import { 
  withRouter
} from 'react-router-dom'

import { firebase } from '../firebase'
import * as routes from '../constants/routes';

class SignOutButton extends Component {
  constructor(props) {
    super(props)
  } 
  
  signOut = (e) => {
    e.preventDefault()

    const {
      history,
    } = this.props
  
    firebase.auth.signOut()
    this.props.history.push(routes.SIGN_IN)
  }

  render() {
    return(
      <a
        type="button"
        onClick={this.signOut}
      >
        Sign Out
      </a>
    )
  } 

}

export default withRouter(SignOutButton);