import { combineReducers } from 'redux';
import { allRoomsReducers, roomDetailsReducers } from './roomReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
  roomDetails: roomDetailsReducers,
});

export default reducer;
