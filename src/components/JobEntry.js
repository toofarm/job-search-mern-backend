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
              <div className="job-item"><span className="job-item-label">Position:</span> {this.props.position}</div>
              <div className="job-item"><span className="job-item-label">Company:</span> {this.props.company}</div><br />
              <button className="delete-job-entry"
                onClick={this.props.deleteJob}
                data-id={this.props.id}>Delete entry</button>
          </div>
        </div>
    );
  }
}

export default JobEntry;