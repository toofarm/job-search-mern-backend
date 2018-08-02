
import { users, storage } from '../firebase';
import { setUserJobs, getJobs } from '../actions'

const jobsUpdate = (id, next) => {
    users.onceGetUserJobs(id).then(snapshot => {
        console.log(snapshot.val())
        let jobs = snapshot.val()
        next(setUserJobs(jobs))
    }).catch(err => {
        console.log(err.message)
    })
}

export const handleUserJobs = store => next => action => {
    console.log(action.type)
    switch(action.type) {
        case 'GET_JOBS':
            jobsUpdate(action.id, next)
            break
        case 'ADD_JOB':
            users.doCreateJob(action.id, action.data.title, action.data.company, action.data.date).then(() => {
                jobsUpdate(action.id, next)
            })
            .catch(error => {
                console.log(error)
            })
            break
        case 'EDIT_JOB':
            users.editOneJob(action.id, action.data.jobId, action.data.title, action.data.company).then(snapshot => {
                jobsUpdate(action.id, next)
            }).catch(err => {
                console.log(err.message)
            })
            break
        case 'DELETE_JOB':
            users.removeOneJob(action.userId, action.jobId).then( () => {
                jobsUpdate(action.userId, next)
            }).catch(err => {
                console.log(err.message)
            })          
            break
        default:
            next(action)
            break
    }
}