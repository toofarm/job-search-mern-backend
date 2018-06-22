import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.loginSubmit = this.loginSubmit.bind(this)
    }

    componentDidMount() {
        console.log('we have login form ' + this.props.api)
    }

    loginSubmit(e) {
        e.preventDefault()
        console.log('submitting login credentials')
        axios.get(this.props.api + 'login')
    }

    render() {
        return <div className="login-form">
            <h2>Welcome to The Hunt</h2>
            <input type='text' name='username' id='username' required/><br/>
            <input type='password' name='pw' id='pw' required/><br/>
            <button id="login-submit"
            onClick={this.loginSubmit}>Submit</button>
            <div className="other-opt-link">
                <Link to="/signup">Need to set up an account?</Link>
            </div>
        </div>
    }
}

export default LoginForm