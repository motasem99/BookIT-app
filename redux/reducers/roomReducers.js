import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  CLEAR_ERRORS,
} from '../constants/roomConstants';

// All rooms reducer

export const allRoomsReducers = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.count,
        rooms: action.payload.rooms,
        // resPerPage: action.payload.resPerPage,
        // filteredRoomsCount: action.payload.filteredRoomsCount,
      };
    case ALL_ROOMS_FAIL:
      return {
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
