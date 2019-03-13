import { SET_OWN_PROFILE, UPDATE_PROFILE, REMOVE_PROFILE } from './types';
import axios from '../../utils/axiosConfig';

const api = process.env.API_ROOT_URL;

export const getOwnProfile = id => async (dispatch) => {
  try {
    const { data: { data } } = await axios.get(`${api}/users/${id}/profile`);

    dispatch({
      type: SET_OWN_PROFILE,
      payload: data
    });
    return;
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return 'Not found.';

      case 500:
      case 502:
        return  'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};

export const updateProfile = profile => (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE,
    profile
  });
};

export const removeProfile = () => (dispatch) => {
  dispatch({
    type: REMOVE_PROFILE,
  });
};
