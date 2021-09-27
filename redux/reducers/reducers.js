import { combineReducers } from 'redux';
import { allRoomsReducers, roomDetailsReducers } from './roomReducers';
import {
  authReducers,
  userReducers,
  forgotPasswordReducers,
  loadedUserReducers,
} from './userReducers';

import { checkBookingReducer } from './bookingReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
  roomDetails: roomDetailsReducers,
  auth: authReducers,
  user: userReducers,
  loadedUser: loadedUserReducers,
  forgotPassword: forgotPasswordReducers,
  checkBooking: checkBookingReducer,
});

export default reducer;
