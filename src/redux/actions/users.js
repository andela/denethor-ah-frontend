import actions from './types';


export const addUser = user => (dispatch) => {
  dispatch({
    type: actions.ADD_USER,
    user
  });
};

export const removeUser = id => (dispatch) => {
  dispatch({
    type: actions.REMOVE_USER,
    id
  });
};
