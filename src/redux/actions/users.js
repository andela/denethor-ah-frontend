import { ADD_USER, REMOVE_USER } from './types';

export const addUser = user => (dispatch) => {
  dispatch({
    type: ADD_USER,
    user
  });
};

export const removeUser = id => (dispatch) => {
  dispatch({
    type: REMOVE_USER,
    id
  });
};
