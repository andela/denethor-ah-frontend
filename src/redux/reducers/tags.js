import { ADD_TAG, REMOVE_TAG, GET_TAGS } from '../actions/types';

const tagReducerDefaultState = [];

const tagReducer = (state = tagReducerDefaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TAG:
      return [...state, payload];

    case REMOVE_TAG:
      return state.filter((tag) => tag !== payload );

    case GET_TAGS:
      return [...payload]

    default:
      return state;
  }
};

export default tagReducer;