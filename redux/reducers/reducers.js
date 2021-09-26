import { combineReducers } from 'redux';
import { allRoomsReducers, roomDetailsReducers } from './roomReducers';
import {
  authReducers,
  userReducers,
  forgotPasswordReducers,
} from './userReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
  roomDetails: roomDetailsReducers,
  auth: authReducers,
  user: userReducers,
  forgotPassword: forgotPasswordReducers,
});

export default reducer;
