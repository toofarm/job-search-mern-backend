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

export const deleteOneJob = (userId, jobId) => {
    return {
        type: 'DELETE_JOB',
        userId: userId,
        jobId: jobId
    }
}

export const createOneJob = (id, data) => {
    return {
        type: 'ADD_JOB',
        id: id,
        data: data
    }
}

export const editOneJob = (id, data) => {
    return {
        type: 'EDIT_JOB',
        id: id,
        data: data
    }
}

export const reorderJobs = (id, order, jobs) => {
    return {
        type: 'REORDER_USER_JOBS',
        id: id,
        order: order,
        jobs: jobs
    }
}