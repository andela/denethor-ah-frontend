import { GET_HIGHLIGHTS, ADD_HIGHLIGHT, CLEAR_HIGHLIGHTS } from '../actions/types';

const highlightDefaultState = [];

const highlightReducer = (state = highlightDefaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_HIGHLIGHT:
      return [...state, payload];
    case GET_HIGHLIGHTS:
      return [...payload];
    case CLEAR_HIGHLIGHTS:
      return [];
    default:
      return state;
  }
}

export default highlightReducer;