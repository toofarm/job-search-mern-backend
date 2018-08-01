import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { handleUserJobs } from '../services/JobsService';

const store = createStore(rootReducer, applyMiddleware(handleUserJobs));

export default store;