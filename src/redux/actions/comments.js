import actions from './types';


export const addComment = comment => (dispatch) => {
  dispatch({
    type: actions.ADD_COMMENT,
    comment
  });
};

export const removeComment = id => (dispatch) => {
  dispatch({
    type: actions.REMOVE_COMMENT,
    id
  });
};
