import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withAuthorization from './withAuthorization'
import PasswordChange from './PasswordChange'
import PasswordForget from './PasswordForget'
import AuthUserContext from './AuthUserContext'

const Dashboard = ({ authUser }) => 
    <div className="dash-meat-wrap">
        <h2>Hello, {authUser.email}</h2>

        {authUser ? <DashboardWidgets />
            : null
        }
    </div>

export class DashboardWidgets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="dashboard-wrap">
                    <div className="dash-input-holder">
                    <h3>Change password</h3>
                        <PasswordChange />
                    </div>
                <div className="dash-input-holder">
                    <PasswordForget />
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

const authCondition = (authUser) => !!authUser

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
  )(Dashboard);