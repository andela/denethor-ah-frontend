import { LOGIN_REQUEST_SUCCESS } from '../actions/types';

export default (state, action) => {
  const isLoggedIn = !!localStorage.getItem('token');

  const authDefaultState = isLoggedIn ? { isLoggedIn } : {};

  state = state || authDefaultState;

  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.user
      };
    default:
      return state;
  }
};
