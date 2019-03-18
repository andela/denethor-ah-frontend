import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

import { GET_FILTERED_ARTICLES } from './types';
import { extractImageFromBody } from '../../utils/imageExtractor';
import { toTimeFromNow } from '../../utils/dateTime';
import toastOptions from '../../utils/toastOptions';

const { API_ROOT_URL } = process.env;

export const getFilteredArticles = (search = '', tag = '', author = '') => (dispatch) => {
  let filterEndpoint = `${API_ROOT_URL}/articles/filter?`

  search ? filterEndpoint += `searchStr=${search}` : '';
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

      return dispatch({
        type: GET_FILTERED_ARTICLES,
        payload: formattedArticles
      });
    })
    .catch(() => {
      toast.error('No Article was found', toastOptions);
    })
}