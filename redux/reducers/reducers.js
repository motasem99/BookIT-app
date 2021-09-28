import { combineReducers } from 'redux';
import { allRoomsReducers, roomDetailsReducers } from './roomReducers';
import {
  authReducers,
  userReducers,
  forgotPasswordReducers,
  loadedUserReducers,
} from './userReducers';

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
} from './bookingReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
  roomDetails: roomDetailsReducers,
  auth: authReducers,
  user: userReducers,
  loadedUser: loadedUserReducers,
  forgotPassword: forgotPasswordReducers,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
});

export default reducer;
