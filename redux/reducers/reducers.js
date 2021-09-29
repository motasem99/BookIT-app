import { combineReducers } from 'redux';
import {
  allRoomsReducers,
  roomDetailsReducers,
  newReviewReducers,
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
  roomDetails: roomDetailsReducers,
  auth: authReducers,
  user: userReducers,
  loadedUser: loadedUserReducers,
  forgotPassword: forgotPasswordReducers,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducers,
});

export default reducer;
