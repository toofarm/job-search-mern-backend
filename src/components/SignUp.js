import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pwInserted: false,
            pwMatch: true
        }

        this.signUpSubmit = this.signUpSubmit.bind(this)
        this.pwFinished = this.pwFinished.bind(this)
    }

    componentDidMount() {
        console.log('we have sign-up form')
    }

    pwFinished() {
        this.setState({
            pwInserted: true
        })
    }

    signUpSubmit(e) {
        e.preventDefault()
        console.log('submitting sign up form')
        let pw = document.getElementById('pick-pw').value
        let pwConfirm = document.getElementById('pw-confirm').value
        if (pw === pwConfirm) {
            this.setState({
                pwMatch: true
            })
            console.log('passwords match')
        } else {
            this.setState({
                pwMatch: false
            })
        }
        // axios.get(this.props.api + 'login')
    }

    render() {
        return <div className="login-form">
            <h2>Create an account</h2>
            {!this.state.pwMatch &&
               <div className="error">
                Passwords do not match
               </div>
            }
            <label htmlFor="pick-username">Choose a username</label>
            <input type='text' name='pick-username' id='pick-username' required/><br/>
            <label htmlFor='email'>Enter your email</label>
            <input type="email" name="email" id="email" required/><br/>
            <label htmlFor="pick-pw">Choose a password</label>
            <input type='password' name='pick-pw' id='pick-pw' required
            onBlur={this.pwFinished}/><br/>
            {this.state.pwInserted &&
               <div className="form-container">
                <label htmlFor='email-confirm'>Confirm your password</label>
                <input type="password" name="pw-confirm" id="pw-confirm" required/><br/>
               </div>
            }
            <button id="signup-submit"
            onClick={this.signUpSubmit}>Sign up</button>
            <div className="other-opt-link">
                <Link to="/signin">Already have an account?</Link>
            </div>
        </div>
    }
}

export default SignUp