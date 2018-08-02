import React, { Component } from 'react';
import JobEntry from './JobEntry'
import { getJobs, deleteOneJob, createOneJob, editOneJob, reorderJobs } from '../actions'

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
  updated: false,
  sortOrder: 'chrono'
}

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.deleteJob = this.deleteJob.bind(this)
    this.editJob = this.editJob.bind(this)
    this.addNewJob = this.addNewJob.bind(this)
    this.toggleJobsOrder = this.toggleJobsOrder.bind(this)
  }

  addNewJob = (e) => {
    e.preventDefault()

    const { createJob } = this.props

    let date = new Date().getTime()
    
    let data = {}
    let id = this.props.userId
    data['title'] = this.state.title
    data['company'] = this.state.company
    data['date'] = date

    createJob(id, data)
    
  }

  deleteJob (e) {
    const { sendDelete } = this.props
    
    let jobId = e.target.dataset.id
    let userId = this.props.userId  

    sendDelete(userId, jobId)
  }

  editJob (e) {
    const { editOneJob } = this.props

    let data = {}

    let id = this.props.userId
    let jobId = e.target.dataset.id
    data['jobId'] = jobId
    data['title'] = document.getElementById(jobId + 'position').value
    data['company'] = document.getElementById(jobId + 'company').value

    var self = this

    editOneJob(id, data)
    
    this.setState({
     updated: true
    })

    setTimeout(function() {
      self.setState({
      updated: false
    })
    }, 5000)

  }

  toggleJobsOrder (e) {
    const { reorderJobs } = this.props

    let order = e.target.dataset.order
    let id = this.props.userId
    let jobs = this.props.jobs

    reorderJobs(id, order, jobs)

    this.setState({
      sortOrder: order
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
            <form onSubmit={this.addNewJob} className="login-form">
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
              <ul className="sort-options">
                <li className={"ghost-btn " + (this.state.sortOrder === 'alpha' ? 'selected' : '')}
                  data-order="alpha"
                  onClick={this.toggleJobsOrder}>
                  Sort jobs alpha
                </li>
                <li className={"ghost-btn " + (this.state.sortOrder === 'chrono' ? 'selected' : '')}
                  data-order="chrono"
                  onClick={this.toggleJobsOrder}>
                  Sort jobs by date
                </li>
              </ul>
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
  sendDelete: (userId, jobId) => dispatch(deleteOneJob(userId, jobId)),
  createJob: (id, data) => dispatch(createOneJob(id, data)),
  editOneJob: (id, data) => dispatch(editOneJob(id, data)),
  reorderJobs: (id, order, jobs) => dispatch(reorderJobs(id, order, jobs))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);

