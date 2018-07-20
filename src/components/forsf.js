  submitDoc (e) {
    let jobId = e.target.dataset.id
    let id = this.props.userId
    let file = document.getElementById(jobId + 'file').files[0]

    var newPath = storage.resumes.child(jobId + '/' + file.name)

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







  class JobEntry extends Component { 
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className="single-job-entry">
            <div className="job-item">
              <span className="job-item-label">Add doc?:</span>
              <input type="file"  
                id={this.props.id +"file"} 
                data-id={this.props.id} 
                onChange={this.props.submitDoc} />
            </div>
      </div>
      );
    }
  }
  
  export default JobEntry;