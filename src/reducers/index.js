import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import jobsReducer from './jobs';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  jobsState: jobsReducer
});

export default rootReducer;