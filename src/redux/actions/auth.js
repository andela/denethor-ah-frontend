import { toast } from 'react-toastify';
import { 
  SET_LOGIN_STATUS, 
  LOGOUT,
  LOGIN_MODAL,
  CHANGE_MOBILE_AUTH_ACTION, 
  DEACTIVATE_MOBILE_AUTH_ACTION, 
  ACTIVATE_MOBILE_AUTH_ACTION 
} from './types';
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
    toast.dismiss();
    return;
  } catch ({ response: { status } }) {
    switch (status) {
      case 401:
        return 'Incorrect username or password.';
      
      case 403:
        return 'Please verify your email and try again';

      case 422:
        return 'Please provide the correct email and password';

      case 500:
      case 502:
        return  'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};

export const showLoginModal = (payload) => ({
  type: LOGIN_MODAL,
  payload
});

export const logout = () => async (dispatch) => {
  await axios.get(`${api}/users/logout`);
  localStorage.clear();
  dispatch({ type: LOGOUT });
  dispatch(removeOwnProfile());
};


export const switchQuickAuthAction = (link) => dispatch => {
  dispatch({
    type: CHANGE_MOBILE_AUTH_ACTION,
    payload: link
  });
}

export const activateQuickAuthAction = () => dispatch => {
  dispatch({
    type: ACTIVATE_MOBILE_AUTH_ACTION
  });
}

export const deactivateQuickAuthAction = () => dispatch => {
  dispatch({
    type: DEACTIVATE_MOBILE_AUTH_ACTION
  });
}