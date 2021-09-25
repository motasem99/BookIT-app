import { combineReducers } from 'redux';
import { allRoomsReducers, roomDetailsReducers } from './roomReducers';
import { authReducers, userReducers } from './userReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
  roomDetails: roomDetailsReducers,
  auth: authReducers,
  user: userReducers,
});

export default reducer;
