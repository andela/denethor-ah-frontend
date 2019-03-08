import actions from './types';


export const addTag = tag => (dispatch) => {
  dispatch({
    type: actions.ADD_TAG,
    tag
  });
};

export const removeTag = tag => (dispatch) => {
  dispatch({
    type: actions.REMOVE_TAG,
    tag
  });
};