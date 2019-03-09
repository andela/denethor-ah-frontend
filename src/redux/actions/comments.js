import { ADD_COMMENT, REMOVE_COMMENT } from './types';


export const addComment = comment => (dispatch) => {
  dispatch({
    type: ADD_COMMENT,
    comment
  });
};

export const removeComment = id => (dispatch) => {
  dispatch({
    type: REMOVE_COMMENT,
    id
  });
};
