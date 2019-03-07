import actions from '../actions/types';

const { ADD_COMMENT, REMOVE_COMMENT } = actions;

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
