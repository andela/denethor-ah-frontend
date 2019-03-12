import {
  ADD_ARTICLE,
  REMOVE_ARTICLE,
  GET_ONE_ARTICLE_SUCCESS,
  GET_ARTICLES_SUCCESS,
  RATE_ARTICLE_SUCCESS,
} from './types';
import axios from 'axios';
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

export const getOneArticle = id => (dispatch) => {
  return axios
  .get(`${API_ROOT_URL}/articles/${id}`)
  .then(response => {
    const article = { ...response.data.data };
    article.featuredImage = extractImageFromBody(article.body);
    article.dateCreated =  toTimeFromNow(article.createdAt);
    dispatch({
      type: GET_ONE_ARTICLE_SUCCESS,
      payload: article
    });
  })
  .catch(error => {
    throw error;
  });
};

export const rateArticle = (rating, articleId) => (dispatch) => {
  let userToken = window.localStorage.getItem('user_token')
  return axios
  .post(`${API_ROOT_URL}/articles/${articleId}/ratings`, {rating}, {
    headers: {
      "Authorization": `Bearer ${userToken}`
    }
  })
  .then(response => {
    console.log('got to success')
    dispatch({
      type: RATE_ARTICLE_SUCCESS,
      paylod: response.data.message
    })
  })
  .catch((error) => {
    console.log('got to error')
    throw error
  })
}
