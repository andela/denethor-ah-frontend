import { GET_AUTHORS } from '../actions/types';

const authorsDefaultState = [];

const authorReducer = (state = authorsDefaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_AUTHORS:
      return [...payload]
    default:
      return state;
  }
}

export default authorReducer;