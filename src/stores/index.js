import { combineReducers } from 'redux';
import errorReducer from './error';
import photosReducer from './photo';
import usersReducer from './user'

export default combineReducers({
  errors: errorReducer,
  photos: photosReducer,
  users: usersReducer
});