import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  resetSuccess: false
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.setState(byPropKey('resetSuccess', true));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    const pwWrongFormat =
      passwordOne.length < 8 ||
      passwordOne.search(/\d/) === -1

    return (
      <form onSubmit={this.onSubmit} className="login-form">
        { this.state.passwordOne !== this.state.passwordTwo && <div className="ui-info">
            Your passwords do not match
        </div> }
        { !isInvalid && pwWrongFormat && <div className="ui-info">
            Your password must be at least 8 characters long and contain at least one number
        </div>}
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid  || pwWrongFormat} type="submit">
          Reset My Password
        </button>
        { this.state.resetSuccess && <div className="ui-info">
            Your password has been updated
        </div> }
        { error && <p className="erro">{error.message}</p> }
      </form>
    );
  }
}

export default PasswordChangeForm;