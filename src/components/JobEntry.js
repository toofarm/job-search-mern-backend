import React, { Component } from 'react';
import { storage, users } from '../firebase';

class JobEntry extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      resumeFilename: ''
     };

     this.getResumeLink = this.getResumeLink.bind(this)
     this.deleteResume = this.deleteResume.bind(this)
     this.submitResume = this.submitResume.bind(this)
  }

  submitResume (e) {
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
        let fileName = newPath.fullPath.split('/')[2]
        this.setState({
          resumeFilename: fileName
        })
      }).catch(err => {
        console.log(err.message)
      })
    }).catch(err => {
      console.log(err.message)
    })
  }

  getResumeLink () {
    let jobId = this.props.id
    let userId = this.props.userId
    let filename = this.state.resumeFilename

    var path = storage.resumes.child(jobId + '/' + filename)

    path.getDownloadURL().then( function (url) {
      console.log(url)
      var link = document.getElementById(jobId + "dwnldLink")
      link.href = url
    }).catch(err => {
      console.log(err.message)
    })
  }

  deleteResume () {
    let jobId = this.props.id
    let userId = this.props.userId
    let filename = this.state.resumeFilename

    var path = storage.resumes.child(jobId + '/' + filename)

    path.delete().then(() => {
      console.log('File deleted')
      users.deleteResume(userId, jobId).then(() => {
        console.log('Resume deleted from user object')
      }).catch(err => {
        console.log(err.message)
      })
      this.setState({
        resumeFilename: ''
      })
    }).catch(err => {
      console.log(err.message)
    })
  }

  componentDidMount () {
    this.setState({
      key: this.props.id
    })
    if (this.props.resume) {
      let filename = this.props.resume.split('/')[2]
      this.setState({
        resumeFilename: filename
      }, () => {
        this.getResumeLink()
      })
    }

  }

  render() {
    return (
      <div className="single-job-entry">
          <div className="jobs-txt-wrap">
              <div className="job-item">
                <span className="job-item-label">Position:</span> 
                <input type="text" id={this.props.id +"position"}  defaultValue={this.props.position} /></div>
              <div className="job-item">
                <span className="job-item-label">Company:</span>
                <input type="text" id={this.props.id + "company"}  defaultValue={this.props.company} /></div><br />
              <div className="job-item">
              {this.state.resumeFilename !== '' &&
                <div className="resume-link">
                  <a id={this.props.id + "dwnldLink"} className="dummy-link" target="_blank">View resume</a>
                  <a id={this.props.id + "deleteLink"} className="dummy-link" onClick={this.deleteResume}>Delete resume</a>
                </div>}
              {this.state.resumeFilename === '' && <div><span className="job-item-label" download>Add doc?:</span>
                <input id={this.props.id +"file"} 
                  data-id={this.props.id} type="file" 
                  onChange={this.submitResume} /></div>}
              </div><br />
              <button className="job-entry-btn"
                onClick={this.props.deleteJob}
                data-id={this.props.id}>Delete entry
              </button>
              <button className="job-entry-btn"
                onClick={this.props.editJob}
                data-id={this.props.id}>Edit entry
              </button>
          </div>
        </div>
    );
  }
}

export default JobEntry;