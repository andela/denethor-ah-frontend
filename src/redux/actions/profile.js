import { REMOVE_OWN_PROFILE, SET_OWN_PROFILE, UPDATE_PROFILE, SET_NOTIFICATIONS } from './types';
import axios from '../../utils/axiosConfig';
import socket from '../../utils/socket';

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

    const userAverageRatingPromise = data.publishedArticles.reduce(async (accumulatorObject, article, index, { length }) => {
      const { totalArticlesWithRating, totalRating, ratingCount } = await accumulatorObject;

      const { data: { data, data: { length: count } } } = await axios.get(`${api}/articles/${article.id}/ratings`);

      const averageRating = data.reduce((average, { rating }) => average + rating/(count > 0 ? count : 1), 0);

      const articleHasRating = count > 0 ? 1 : 0;
      const articlesWithRating = totalArticlesWithRating + articleHasRating;
      const currentCount = ratingCount + count;
      const currentRating = Number(averageRating) + totalRating;

      return {
        ...((index === length - 1 && articlesWithRating > 0)
          && { averageRating: currentRating/articlesWithRating }),
        totalArticlesWithRating: articlesWithRating,
        totalRating: currentRating,
        ratingCount: currentCount
      }
    }, Promise.resolve({
      totalArticlesWithRating: 0,
      totalRating: 0,
      ratingCount: 0
    }));

    const userAverageRating = await Promise.resolve(userAverageRatingPromise);

    dispatch({
      type: UPDATE_PROFILE,
      payload: { userAverageRating }
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
        return  'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};


export const uploadProfilePicture = (id, newProfilePicture) => async (dispatch) => {
  try {
    const dataURLtoFile = (dataurl, filename) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1);
        n -= 1;
      }
      return new File([u8arr], filename, { type: mime });
    }
    

    const file = dataURLtoFile(newProfilePicture, 'profile-picture');

    const data = new FormData();
    data.append('profile-picture', file, file.name);

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
        return  'Server error.';

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
