import { LOGOUT, SET_LOGIN_STATUS, LOGIN_MODAL } from '../actions/types';

const authDefaultState = {
  isLoggedIn: undefined
}

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        isLoggedIn: action.payload,
      };

    case LOGIN_MODAL:
      return {
        loginModal: action.payload,
      };

    case LOGOUT:
      return {
        isLoggedIn: false
      };

    default:
      return state;
  }
};
