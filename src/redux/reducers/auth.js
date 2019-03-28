import { LOGOUT, SET_LOGIN_STATUS } from '../actions/types';

const token = localStorage.getItem('token');

const isLoggedIn = token !== null ? true : false;

const authDefaultState = {
  isLoggedIn
}

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        isLoggedIn: action.payload,
      };

    case LOGOUT:
      return {
        isLoggedIn: false
      };

    default:
      return state;
  }
};