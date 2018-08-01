import React, { Component } from 'react';
import JobEntry from './JobEntry'
import { getJobs, deleteOneJob } from '../actions'

import { connect } from 'react-redux'
import { compose } from 'recompose'

import multer from 'multer';

import { auth, users, storage } from '../firebase';

const upload = multer({ storage: storage })

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  error: null,
  title: '',
  company: '',
  jobs: null,
  id: '',
  updated: false
}

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.deleteJob = this.deleteJob.bind(this)
    this.editJob = this.editJob.bind(this)
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
    const { sendDelete } = this.props
    
    let jobId = e.target.dataset.id
    let id = this.props.userId
    console.log('Job id to remove: ' + jobId)

    sendDelete(id, jobId)
  }

  editJob (e) {
    let jobId = e.target.dataset.id
    let id = this.props.userId
    let title = document.getElementById(jobId + 'position').value
    let company = document.getElementById(jobId + 'company').value

    var self = this

    users.editOneJob(id, jobId, title, company).then(snapshot => {
      this.setState({
        updated: true
      })
      setTimeout(function() {
        self.setState({
          updated: false
        })
      }, 5000)
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount () {
    const { getUserJobs } = this.props
    let id = this.props.userId
    getUserJobs(id)
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
            {this.state.updated && <div className="crud-flag">Job apps updated!</div>}
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
            { !!this.props.jobs && <div className="jobs-wrap">
              {Object.keys(this.props.jobs).map(key =>
                  <JobEntry key={key}
                      id={key}
                      userId={this.props.userId}
                      position={this.props.jobs[key].position} 
                      company={this.props.jobs[key].company}
                      resume={this.props.jobs[key].resume}
                      deleteJob={this.deleteJob}
                      editJob={this.editJob} />
              )}
            </div>}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jobs: state.jobsState.jobs
});

const mapDispatchToProps = (dispatch) => ({
  getUserJobs: (id) => dispatch(getJobs(id)),
  sendDelete: (id, jobId) => dispatch(deleteOneJob(id, jobId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);

