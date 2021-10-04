import { combineReducers } from 'redux';
import {
  allRoomsReducers,
  roomDetailsReducers,
  newReviewReducers,
  checkReviewReducers,
  newRoomReducers,
  roomReducers,
  roomReviewsReducers,
  reviewReducers,
} from './roomReducers';
import {
  authReducers,
  userReducers,
  forgotPasswordReducers,
  loadedUserReducers,
  allUsersReducer,
  userDetailsReducer,
} from './userReducers';

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
  bookingReducer,
} from './bookingReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
  newRoom: newRoomReducers,
  roomDetails: roomDetailsReducers,
  room: roomReducers,
  auth: authReducers,
  user: userReducers,
  loadedUser: loadedUserReducers,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducers,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  booking: bookingReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducers,
  checkReview: checkReviewReducers,
  roomReviews: roomReviewsReducers,
  review: reviewReducers,
});

export default reducer;
