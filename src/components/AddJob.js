import React, { Component } from 'react';
import JobEntry from './JobEntry'

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

    this.getJobsObject = this.getJobsObject.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
    this.editJob = this.editJob.bind(this)
    this.submitDoc = this.submitDoc.bind(this)
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

  submitDoc (e) {
    let jobId = e.target.dataset.id
    let id = this.props.userId
    let file = document.getElementById(jobId + 'file').files[0]

    const customMeta = {
      'contentType': file.type
    }
    console.log(file)

    var newPath = storage.resumes.child(jobId + '/' + file.name)
    console.log(newPath.fullPath)

    newPath.put(file).then(snapshot => {
      console.log('Uploaded file')
      users.addResume(id, jobId, newPath.fullPath).then(snapshot => {
        console.log('saved file path')
      }).catch(err => {
        console.log(err.message)
      })
    }).catch(err => {
      console.log(err.message)
    })
    

  }

  componentDidMount () {
    let id = this.props.userId
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
            { !!this.state.jobs && <div className="jobs-wrap">
              {Object.keys(this.state.jobs).map(key =>
                  <JobEntry key={key}
                      id={key}
                      position={this.state.jobs[key].position} 
                      company={this.state.jobs[key].company}
                      deleteJob={this.deleteJob}
                      editJob={this.editJob}
                      submitDoc={this.submitDoc} />
              )}
            </div>}
        </div>
    );
  }
}

export default AddJob;