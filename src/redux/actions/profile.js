import { SET_OWN_PROFILE, UPDATE_PROFILE } from './types';
import axios from '../../utils/axiosConfig';

const api = process.env.API_ROOT_URL;

export const getOwnProfile = id => async (dispatch) => {
  try {
    const { data: { data } } = await axios.get(`${api}/users/${id}/profile`);
 
    dispatch({
      type: SET_OWN_PROFILE,
      payload: data
    });

    const userAverageRatingPromise = data.publishedArticles.reduce(async (accumulatorObject, article, index, { length }) => {
      const { totalArticlesWithRating, totalRating, ratingCount } = await accumulatorObject;
      const {
        data: { data: { count, rows: [{ averageRating } = { averageRating: 0 }] } }
      } = await axios.get(`${api}/articles/${article.id}/ratings`);
      const articleHasRating = count > 0 ? 1 : 0;
      const articlesWithRating = totalArticlesWithRating + articleHasRating;
      const currentCount = ratingCount + count;
      const currentRating = Number(averageRating)  + totalRating;

      return {
        ...(index === length - 1 && { averageRating: currentRating/articlesWithRating }),
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
    const formData = new FormData();
    formData.append('profile-picture', newProfilePicture);

    const { data: { data: { imageUrl } } } = await axios({
      url: `${api}/users/${id}/profile/upload`,
      method: 'post',
      data: formData
    })

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
