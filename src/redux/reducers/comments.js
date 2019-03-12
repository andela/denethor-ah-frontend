import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENT_SUCCESS
} from '../actions/types';

export const commentReducerDefaultState = {
  comments: []
};

export default (state = commentReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state
      }
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...action.comments]
      };

    case REMOVE_COMMENT:
      return state.filter(({
        id
      }) => id !== action.id);

    default:
      return state;
  }
};
