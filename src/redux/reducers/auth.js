import { LOGIN_REQUEST_SUCCESS } from '../actions/types';

export default (state, action) => {
  const user = localStorage.getItem('user');

  const authDefaultState = user ? {
    isLoggedIn: true,
    user: JSON.parse(user)
  } : {};

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
