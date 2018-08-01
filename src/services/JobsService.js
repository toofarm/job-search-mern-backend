
import { users, storage } from '../firebase';
import { setUserJobs } from '../actions'

export const handleUserJobs = store => next => action => {
    console.log(action.type)
    switch(action.type) {
        case 'GET_JOBS':
            users.onceGetUserJobs(action.id).then(snapshot => {
                console.log(snapshot.val())
                let jobs = snapshot.val()
                next(setUserJobs(jobs))
            }).catch(err => {
                console.log(err.message)
            })
            break
        case 'DELETE_JOB':
            users.removeOneJob(action.id, action.jobId)
            users.onceGetUserJobs(action.id).then(snapshot => {
                console.log(snapshot.val())
                let jobs = snapshot.val()
                next(setUserJobs(jobs))
            }).catch(err => {
                console.log(err.message)
            })
            break
        default:
            next(action)
            break
    }
}