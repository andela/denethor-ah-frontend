import { SET_LOGIN_STATUS, LOGOUT } from './types';
import axios from '../../utils/axiosConfig';
import { removeOwnProfile } from './profile';

const api = process.env.API_ROOT_URL;

export const setLoggedInState = (loggedInState) => ({
  type: SET_LOGIN_STATUS,
  payload: loggedInState
});

export const login = loginDetails => async (dispatch) => {
  try {
    const { data: { data: { token } } } = await axios.post(`${api}/users/login`, loginDetails);

    localStorage.setItem('token', token);

    dispatch(setLoggedInState(true));
    return;
  } catch ({ response: { status } }) {
    switch (status) {
      case 401:
        return 'Incorrect username or password.';

      case 500:
      case 502:
        return  'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};

export const logout = () => async (dispatch) => {
  await axios.get(`${api}/users/logout`);
  localStorage.clear();
  dispatch({ type: LOGOUT });
  dispatch(removeOwnProfile());
};
