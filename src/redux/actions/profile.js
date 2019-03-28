import { REMOVE_OWN_PROFILE, SET_OWN_PROFILE, UPDATE_PROFILE, SET_NOTIFICATIONS } from './types';
import axios from '../../utils/axiosConfig';
import socket from '../../utils/socket';
import dataURLtoFile from '../../utils/dataURLtoFile';

const api = process.env.API_ROOT_URL;

export const getOwnProfile = id => async (dispatch) => {
  try {
    const { data: { data } } = await axios.get(`${api}/users/${id}/profile`);

    dispatch({
      type: SET_OWN_PROFILE,
      payload: data
    });

    socket.emit('addUserListener', data.id);

    socket.on('setNotifications', (notifications) => {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: notifications
      })
    });

    return;
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return 'Not found.';

      case 500:
      case 502:
        return 'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};

export const updateProfile = (id, updates) => async (dispatch) => {
  try {
    await axios.patch(`${api}/users/${id}/profile`, updates);

    dispatch({
      type: UPDATE_PROFILE,
      payload: updates
    });
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return 'Not found.';

      case 500:
      case 502:
        return 'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};


export const uploadProfilePicture = (id, newProfilePicture) => async (dispatch) => {
  try {
    const data = dataURLtoFile(newProfilePicture);

    const { data: { data: { imageUrl } } } = await axios({
      url: `${api}/users/${id}/profile/upload`,
      method: 'post',
      data
    });

    dispatch({
      type: UPDATE_PROFILE,
      payload: { imageUrl }
    });
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return 'Not found.';

      case 500:
      case 502:
        return 'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};

export const userBookmarks = (id) => async (dispatch) => {
  try {
    const { data: { userBookmarks } } = await axios.get(`${api}/bookmarks?userId=${id}`);

    const bookmarkedArticlesPromises = userBookmarks.map(async ({ articleUrl }) => {
      const { data: { data } } = await axios.get(articleUrl);
      return data;
    });

    const bookmarks = await Promise.all(bookmarkedArticlesPromises);

    dispatch({
      type: UPDATE_PROFILE,
      payload: { bookmarks }
    });

  } catch (err) {
    return err;
  }
};

export const removeOwnProfile = () => ({
  type: REMOVE_OWN_PROFILE
});
