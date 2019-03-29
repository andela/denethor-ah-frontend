import { LOGOUT, SET_LOGIN_STATUS, LOGIN_MODAL } from '../actions/types';

const token = localStorage.getItem('token');

const isLoggedIn = token !== null ? true : false;

const authDefaultState = {
  isLoggedIn
}

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case LOGIN_MODAL:
      return {
        ...state,
        loginModal: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
};
