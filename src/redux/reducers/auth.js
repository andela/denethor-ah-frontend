import { LOGIN_REQUEST_SUCCESS, LOGOUT } from '../actions/types';

export default (state, action) => {
  const isLoggedIn = !!localStorage.getItem('token');

  const authDefaultState = isLoggedIn ? { isLoggedIn } : {};

  state = state || authDefaultState;

  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return {
        isLoggedIn: true,
      };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};
