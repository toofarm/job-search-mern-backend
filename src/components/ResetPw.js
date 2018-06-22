import React from "react";
import axios from "axios";

export class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.resetPwSubmit = this.resetPwSubmit.bind(this);
  }

  componentDidMount() {
    console.log("we have Reset form");
  }

  resetPwSubmit(e) {
    e.preventDefault();
    console.log("sending reset password email");
    // axios.get(this.props.api + 'login')
  }

  render() {
    return (
      <div className="dash-input-holder">
        <div className="login-form">
          <h3>Reset password</h3>
          <input
            type="email"
            name="new-pw-email"
            id="new-pw-email"
            placeholder="New password"
            required
          />
          <br />
          <button id="login-submit" onClick={this.resetPwSubmit}>
            Reset password
          </button>
        </div>
      </div>
    );
  }
}

export default Reset;
