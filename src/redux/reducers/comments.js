import { ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';

const commentReducerDefaultState = [];

export default (state = commentReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.comment];

    case REMOVE_COMMENT:
      return state.filter(({ id }) => id !== action.id );

    default:
      return state;
  }
};
