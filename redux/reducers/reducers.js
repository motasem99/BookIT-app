import { combineReducers } from 'redux';
import { allRoomsReducers } from './roomReducers';

const reducer = combineReducers({
  allRooms: allRoomsReducers,
});

export default reducer;
