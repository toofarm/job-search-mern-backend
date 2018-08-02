const INITIAL_STATE = {
    users: {},
  };

const setUserJobs = (state, action) => ({
    ...state,
    jobs: action.jobs
  })

  function jobsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'SET_USER_JOBS': {
        return setUserJobs(state, action);
      }
      case 'REORDER_USER_JOBS': {
        console.log(action)
        switch (action.order) {
          case 'alpha': {
            let jobs = action.jobs
            let jobsReordered = {}
            let newKeys = Object.keys(jobs)
              .sort((a,b) => {
                if (jobs[a].company < jobs[b].company) return -1
                if (jobs[a].company > jobs[b].company) return 1
                return 0
              })
            newKeys.forEach( key => jobsReordered[key] = jobs[key])
            action.jobs = jobsReordered
          }
          break
          case 'chrono': {
            let jobs = action.jobs
            let jobsReordered = {}
            let newKeys = Object.keys(jobs)
              .sort((a,b) => {
                if (jobs[a].date < jobs[b].date) return -1
                if (jobs[a].date > jobs[b].date) return 1
                return 0
              })
            newKeys.forEach( key => jobsReordered[key] = jobs[key])
            action.jobs = jobsReordered
          }
          break
        }
        console.log(action.jobs)
        return setUserJobs(state, action);
      }
      default : return state;
    }
  }
  
  export default jobsReducer;