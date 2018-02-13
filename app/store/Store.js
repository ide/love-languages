import { combineReducers, createStore } from 'redux';

import QuizReducer from './QuizReducer';

const rootReducer = combineReducers({
  quiz: QuizReducer,
});

export default createStore(rootReducer);
