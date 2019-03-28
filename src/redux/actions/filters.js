import { escape } from 'validator';

import axios from '../../utils/axiosConfig';
import { GET_FILTERED_ARTICLES, CLEAR_FILTERED_ARTICLES } from './types';
import { extractImageFromBody } from '../../utils/imageExtractor';
import { toTimeFromNow } from '../../utils/dateTime';

const { API_ROOT_URL } = process.env;

const getFilteredArticles = (search = '', tag = '', author = '') => (dispatch) => {
  let filterEndpoint = `${API_ROOT_URL}/articles/filter?`

  search ? filterEndpoint += `searchStr=${escape(search)}` : '';
  tag ? filterEndpoint += `&tag=${tag}` : ''
  author ? filterEndpoint += `&author=${author}` : '';

  return axios
    .get(filterEndpoint)
    .then((response) => {
      const { data: { data: { articles } } } = response;

      const formattedArticles = articles.map((article) => {
        article.featuredImage = extractImageFromBody(article.body);
        article.dateCreated = toTimeFromNow(article.createdAt);
        return article;
      });

      dispatch({
        type: GET_FILTERED_ARTICLES,
        payload: formattedArticles
      });
    })
    .catch(() => {
      dispatch({ type: CLEAR_FILTERED_ARTICLES });
    })
}

export default getFilteredArticles;