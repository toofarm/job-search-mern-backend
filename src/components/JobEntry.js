import React, { Component } from 'react';

class JobEntry extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      key: ''
     };


  }

  componentDidMount () {
    this.setState({
      key: this.props.id
    })
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
                <span className="job-item-label">Add doc?:</span>
                <input id={this.props.id +"file"} 
                  data-id={this.props.id} type="file" 
                  onChange={this.props.submitDoc} />
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