import { LOGIN_REQUEST_SUCCESS, LOGOUT } from './types';
import axios from '../../utils/axiosConfig';
import { escapeInputs } from '../../utils/escapeInputs';

const api = process.env.API_ROOT_URL;

export const setLoggedInState = {
  type: LOGIN_REQUEST_SUCCESS,
}

export const login = loginDetails => async (dispatch) => {
  const escapedLoginDetails = escapeInputs(loginDetails);

  try {
    const { data: { data: { token } } } = await axios.post(`${api}/users/login`, escapedLoginDetails);

    localStorage.setItem('token', token);

    dispatch(setLoggedInState);
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

export const logout = () => ({ type: LOGOUT });
