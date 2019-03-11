import { ADD_TAG, REMOVE_TAG } from '../actions/types';

const tagReducerDefaultState = [];

export default (state = tagReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_TAG:
      return [...state, action.tag];

    case REMOVE_TAG:
      return state.filter((tag) => tag !== action.tag );

    default:
      return state;
  }
};