import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { auth } from '../firebase'

const PasswordForgetPage = () =>
  <div>
    <h2>PasswordForget</h2>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  error: null,
  emailSent: false
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        this.setState(byPropKey('emailSent', true))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      });

    event.preventDefault()
  }

  render() {
    const {
      email,
      error,
      emailSent
    } = this.state;

    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit} className="login-form">
        <input
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        /><br/>
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        { emailSent &&
        <div className="em-sent">
            Check your email for a link to reset your password
        </div>}
        { error && <p class="error">{error.message}</p> }
      </form>
    )
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage

export {
  PasswordForgetForm,
  PasswordForgetLink,
}