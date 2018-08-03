import React, { Component } from 'react';
import { connect } from 'react-redux'

import PasswordChange from './PasswordChange'
import PasswordForget from './PasswordForget'
import UsernameChange from './UsernameChange'

const INITIAL_STATE = {
    error: null,
    userName: 'friend',
    userId: '',
    userRetrieved: false
  }


export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE}

        this.handleUserNameChange = this.handleUserNameChange.bind(this)
    }

    handleUserNameChange (newName) {
        this.setState({
            userName: newName
        })
    }

    componentDidMount() {

        // users.onceGetUsers().then(snapshot => {
        //     let allUsers = snapshot.val()
        //     console.log(allUsers)
        //     for ( var key in allUsers ) {
        //         if (this.props.authUser.email === allUsers[key].email) {
        //             this.setState({
        //                 userName: allUsers[key].username,
        //                 userId: key,
        //                 userRetrieved: true
        //             });  
        //         }
        //     }
        //     console.log(this.state.userName)
        // }).catch(error => {
        //     console.log(error)
        // });
        let allUsers = this.props.users

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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.userState.users,
    authUser: state.sessionState.authUser
  });
  
  const mapDispatchToProps = (dispatch) => ({
    // getUserJobs: (id) => dispatch(getJobs(id))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);


