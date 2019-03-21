import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_COMMENT_FAILURE,
  GET_COMMENT_SUCCESS
} from '../actions/types';

export const commentReducerDefaultState = {
  comments: [],
  loading: false
};

export default (state = commentReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        loading: true
      }
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...action.comments],
        loading: false
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        loading: false
      }
    case REMOVE_COMMENT:
      return state.filter(({
        id
      }) => id !== action.id);

    default:
      return state;
  }
};
