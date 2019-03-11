import { GET_ARTICLES_SUCCESS, ADD_ARTICLE , REMOVE_ARTICLE} from '../actions/types'
import axios from 'axios';


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
  .get(`${process.env.API_ROOT_URL}/articles/?${query}`)
  .then((response) => {
    return dispatch({
      type: GET_ARTICLES_SUCCESS,
      payload: response.data.data
    });
  })
  .catch(error => {
    throw error;
  })
}
