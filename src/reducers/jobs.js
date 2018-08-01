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
      default : return state;
    }
  }
  
  export default jobsReducer;