import React from 'react'
import axios from 'axios'
import Reset from './ResetPw'

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.updatePwSubmit = this.updatePwSubmit.bind(this)
    }

    componentDidMount() {
        console.log('we have Dashboard')
    }

    updatePwSubmit(e) {
        e.preventDefault()
        console.log('updating password')
        // axios.get(this.props.api + 'login')
    }

    render() {
        return <div className="dash-meta-wrap">
            <h2>Hello, stranger</h2>
            <div className="dashboard-wrap">
                    <div className="dash-input-holder">
                        <div className="login-form">
                        <h3>Change password</h3>
                        <input type='text' name='new-pw' id='new-pw' placeholder="New password" required/><br/>
                        <input type='text' name='old-pw' id='old-pw' placeholder="Old password" required/><br/>
                        <button id="login-submit"
                        onClick={this.updatePwSubmit}>Update password</button>
                        </div>
                    </div>
                    <Reset />
            </div>
        </div>
    }
}

export default Dashboard