import { LOGIN_REQUEST_SUCCESS } from './types';
import axios from 'axios';

const api = process.env.API_ROOT_URL;

export const login = loginDetails => async (dispatch) => {
  try {
    const { data: { data: { token } } } = await axios.post(`${api}/users/login`, loginDetails);

    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_REQUEST_SUCCESS,
    });
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
