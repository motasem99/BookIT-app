import { combineReducers } from 'redux';
import {
  allRoomsReducers,
  roomDetailsReducers,
  newReviewReducers,
  checkReviewReducers,
  newRoomReducers,
  roomReducers,
} from './roomReducers';
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
  bookingDetailsReducer,
} from './bookingReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
  newRoom: newRoomReducers,
  roomDetails: roomDetailsReducers,
  room: roomReducers,
  auth: authReducers,
  user: userReducers,
  loadedUser: loadedUserReducers,
  forgotPassword: forgotPasswordReducers,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducers,
  checkReview: checkReviewReducers,
});

export default reducer;
