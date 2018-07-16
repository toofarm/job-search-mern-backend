import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withAuthorization from './withAuthorization'
import PasswordChange from './PasswordChange'
import PasswordForget from './PasswordForget'
import UsernameChange from './UsernameChange'
import AuthUserContext from './AuthUserContext'
import AddJob from './AddJob'
import { users } from '../firebase';

const Dashboard = ({ authUser, users }) => 
    <div className="dash-meat-wrap">
        {authUser ? <DashboardWidgets authUser={authUser}
            users={users}/>
            : null
        }
    </div>

export class DashboardWidgets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: 'friend',
            userId: '',
            userRetrieved: false
        }
        
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
    }

    handleUserNameChange (newName) {
        this.setState({
            userName: newName
        })
    }

    handleNewJob (title, company) {
        console.log(title, company)
    }

    componentDidMount() {
        const { onSetUsers } = this.props

        users.onceGetUsers().then(snapshot => {
            let allUsers = snapshot.val()
            console.log(allUsers)
            for ( var key in allUsers ) {
                if (this.props.authUser.email === allUsers[key].email) {
                    this.setState({
                        userName: allUsers[key].username,
                        userId: key,
                        userRetrieved: true
                    });  
                }
            }
            console.log(this.state.userName)
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        return (
            <div>
                <h2>Hello, {this.state.userName}</h2>
                <div className="dashboard-wrap">
                    <div className="dash-input-holder">
                    <h3>Change password</h3>
                        <PasswordChange />
                    </div>
                    <div className="dash-input-holder">
                        <PasswordForget />
                    </div>
                    <div className="dash-input-holder">
                        <h3>Update Username</h3>
                        <UsernameChange userId={this.state.userId} 
                            sendNameChange={this.handleUserNameChange} />
                    </div>
                </div>
                { this.state.userRetrieved && <AddJob userId={this.state.userId}
                    sendNewJob={this.handleNewJob} /> }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    users: state.userState.users
  });

  const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  });

const authCondition = (authUser) => !!authUser

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
  )(Dashboard);