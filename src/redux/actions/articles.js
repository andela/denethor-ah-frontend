import {
  ADD_ARTICLE,
  REMOVE_ARTICLE,
  GET_ONE_ARTICLE_SUCCESS,
  GET_ARTICLES_SUCCESS,
  RATE_ARTICLE_SUCCESS,
  GET_ARTICLE_RATINGS_SUCCESS,
  LIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_SUCCESS,
  GET_ARTICLE_LIKES_SUCCESS,
  GET_ARTICLE_DISLIKES_SUCCESS,
  REMOVE_ARTICLE_BOOKMARK_SUCCESS,
  GET_USER_BOOKMARKS_SUCCESS,
  ARTICLE_CREATE_SUCCESS
} from './types';
import axios from '../../utils/axiosConfig';
import { extractImageFromBody } from '../../utils/imageExtractor';
import { toTimeFromNow } from '../../utils/dateTime';

const { API_ROOT_URL } = process.env;

export const addArticle = article => (dispatch) => {
  dispatch({
    type: ADD_ARTICLE,
    article
  });
};

export const removeArticle = id => (dispatch) => {
  dispatch({
    type: REMOVE_ARTICLE,
    id
  });
};

export const getArticles = (category) => (dispatch) => {
  const query = category && category !== undefined ? `category=${category}` : ''
  return axios
  .get(`${API_ROOT_URL}/articles/?${query}`)
  .then((response) => {
    const articles = response.data.data.map(article => {
      article.featuredImage = extractImageFromBody(article.body);
      article.dateCreated =  toTimeFromNow(article.createdAt);
      return article;
    });
    return dispatch({
      type: GET_ARTICLES_SUCCESS,
      payload: articles
    });
  })
  .catch(error => {
    throw error;
  })
}

export const getOneArticle = (id) => (dispatch) => {
  return axios.get(`${API_ROOT_URL}/articles/${id}`)
  .then(response => {
    const article = { ...response.data.data };
    article.featuredImage = extractImageFromBody(article.body);
    article.dateCreated =  toTimeFromNow(article.createdAt);
    dispatch({
      type: GET_ONE_ARTICLE_SUCCESS,
      payload: article
    });
    return article;
  })
  .catch(error => {
    throw error;
  });
};

export const getArticleAvgRating = (articleId) => (dispatch) => {
  return axios
  .get(`${API_ROOT_URL}/articles/${articleId}/ratings`)
  .then(response => {
    dispatch({
      type: GET_ARTICLE_RATINGS_SUCCESS,
      payload: response.data.data
    })
  })
  .catch((error) => {
    throw error
  })
}

export const rateArticle = (rating, articleId) => (dispatch) => {
  return axios
  .post(`${API_ROOT_URL}/articles/${articleId}/ratings`, {rating})
  .then(response => {
    dispatch({
      type: RATE_ARTICLE_SUCCESS,
      payload: response.data.article
    })
  })
  .catch((error) => {
    throw error
  })
}

export const likeArticle = (articleId) => (dispatch) => {
  return axios
  .patch(`${API_ROOT_URL}/articles/${articleId}/likes`, {})
  .then(response => {
    dispatch({
      type: LIKE_ARTICLE_SUCCESS,
      payload: response.data.data
    });
    return response
  })
  .catch((error) => {
    throw error
  })
}

export const dislikeArticle = (articleId) => (dispatch) => {
  return axios
  .patch(`${API_ROOT_URL}/articles/${articleId}/dislikes`, {})
  .then(response => {
    dispatch({
      type: DISLIKE_ARTICLE_SUCCESS,
      payload: response.data.data
    });
    return response
  })
  .catch((error) => {
    throw error
  })
}

export const bookmarkArticle = (articleId) => (dispatch) => {
  return axios
  .post(`${API_ROOT_URL}/bookmarks?articleId=${articleId}`)
  .then(response => {
    dispatch({
      type: BOOKMARK_ARTICLE_SUCCESS,
      payload: response.data
    })
    return response
  })
  .catch((error) => {
    throw error
  })
}

export const removeArticleBookmark = (articleId) => (dispatch) => {
  return axios
  .delete(`${API_ROOT_URL}/bookmarks?articleId=${articleId}`)
  .then(response => {
    dispatch({
      type: REMOVE_ARTICLE_BOOKMARK_SUCCESS,
      payload: response.data
    })
    return response
  })
  .catch((error) => {
    throw error
  })
}

export const getUserBookmarks = (userId) => (dispatch) => {
  return axios
  .get(`${API_ROOT_URL}/bookmarks?userId=${userId}`)
  .then(response => {
    dispatch({
      type: GET_USER_BOOKMARKS_SUCCESS,
      payload: response.data.userBookmarks
    })
    return response
  })
  .catch((error) => {
    throw error
  })
}

export const getArticleLikes = (articleId) => (dispatch) => {
  return axios
  .get(`${API_ROOT_URL}/articles/${articleId}/likes`)
  .then(response => {
    dispatch({
      type: GET_ARTICLE_LIKES_SUCCESS,
      payload: response.data.data
    });
    return response
  })
  .catch((error) => {
    throw error
  })
}

export const getArticleDislikes = (articleId) => (dispatch) => {
  return axios
  .get(`${API_ROOT_URL}/articles/${articleId}/dislikes`)
  .then(response => {
    dispatch({
      type: GET_ARTICLE_DISLIKES_SUCCESS,
      payload: response.data.data
    });
    return response
  })
  .catch((error) => {
    throw error
  })
}

export const createArticle = (data) => (dispatch) => {
  return axios
  .post(`${API_ROOT_URL}/articles`, data)
  .then(response => {
    dispatch({
      type: ARTICLE_CREATE_SUCCESS,
      payload: response.data.data
    });
    return response;
  })
  .catch((error) => {
    throw error;
  })
}