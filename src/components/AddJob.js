import React, { Component } from 'react';
import JobEntry from './JobEntry'

import { auth, users } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  error: null,
  title: '',
  company: '',
  jobs: null,
  id: ''
}

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.getJobsObject = this.getJobsObject.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
  }

  getJobsObject (id) {
    users.onceGetUserJobs(id).then(snapshot => {
        this.setState({
            jobs: snapshot.val()
        })
        console.log(this.state.jobs)
    }).catch(error => {
        console.log(error)
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let id = this.props.userId
    let title = this.state.title
    let company = this.state.company

    users.doCreateJob(id, title, company).then(() => {
        this.getJobsObject(id)
    })
    .catch(error => {
        console.log(error)
    })
  }

  deleteJob (e) {
    let jobId = e.target.dataset.id
    let id = this.props.userId
    console.log('Job id to remove: ' + jobId)

    users.removeOneJob(id, jobId)

    users.onceGetUserJobs(id).then(snapshot => {
        this.setState({
            jobs: snapshot.val()
        })
        console.log(this.state.jobs)
    }).catch(error => {
        console.log(error)
    })
    
  }

  componentDidMount () {
    let id = this.props.userId
    console.log('User id = ' + id)
    this.getJobsObject(id)
  }

  render() {
    const {
      title,
      company
    } = this.state;

    const isInvalid =
      title === '' ||
      company === ''

    return (
        <div className="jobs-wrap">
            <h2>Add new job application</h2>
            <form onSubmit={this.onSubmit} className="login-form">
                <input
                onChange={event => this.setState(byPropKey('title', event.target.value))}
                type="text"
                placeholder="Job title"
                />
                <input
                onChange={event => this.setState(byPropKey('company', event.target.value))}
                type="text"
                placeholder="Company name"
                />
                <button disabled={isInvalid} type="submit">
                Add job
                </button>
            </form>
            { !!this.state.jobs && <div className="jobs-wrap">
              {Object.keys(this.state.jobs).map(key =>
                  <JobEntry key={key}
                      id={key}
                      position={this.state.jobs[key].position} 
                      company={this.state.jobs[key].company}
                      deleteJob={this.deleteJob} />
              )}
            </div>}
        </div>
    );
  }
}

export default AddJob;