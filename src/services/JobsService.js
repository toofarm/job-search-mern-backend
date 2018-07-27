
import { auth, users, storage } from '../firebase';

export const getJobsObject = (id) => 
    users.onceGetUserJobs(id).then(snapshot => {
        this.setState({
            jobs: snapshot.val()
        })
        console.log(this.state.jobs)
    }).catch(error => {
        console.log(error)
    })