import React, { Component } from 'react';

import { auth, users } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  resetSuccess: false,
  username: '',
  userId: ''
}

class UsernameChange extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.sendNameChange = this.props.sendNameChange.bind(this)
  }

  onSubmit = (e) => {
    e.preventDefault()
    let id = this.props.userId
    let username = this.state.username

    users.updateUsername(id, username).then(() => {
        this.sendNameChange(username)
    })
    .catch(error => {
        console.log(error)
    })
  }

  render() {
    const {
      username
    } = this.state;

    const isInvalid =
      username === ''

    return (
      <form onSubmit={this.onSubmit} className="login-form">
        <input
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="New username"
        />
        <button disabled={isInvalid} type="submit">
          Change username
        </button>
      </form>
    );
  }
}

export default UsernameChange;