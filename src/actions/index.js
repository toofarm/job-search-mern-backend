export const getJobs = (id) => {
    return {
        type: 'GET_JOBS',
        id: id
    }
}

export const setUserJobs = (jobs) => {
    return {
        type: 'SET_USER_JOBS',
        jobs: jobs
    }
}

export const deleteOneJob = (id, userId) => {
    return {
        type: 'DELETE_JOB',
        id: id,
        userId: userId
    }
}