import axios from '../../utils/axiosConfig';
import { ADD_HIGHLIGHT, GET_HIGHLIGHTS, CLEAR_HIGHLIGHTS } from './types';
import { escapeInputs } from '../../utils/escapeInputs';

const { API_ROOT_URL } = process.env;

export const addHighlight = (articleId, highlightDetails) => (dispatch) => {
  const escapedDetails = escapeInputs(highlightDetails);

  return axios
    .post(`${API_ROOT_URL}/articles/${articleId}/highlights`, escapedDetails)
    .then((response) => {
      const { data: { data: { highlight, message } } } = response;

      dispatch({
        type: ADD_HIGHLIGHT,
        payload: highlight
      });

      return { message, highlight };
    })
    .catch(({ response: { status, error } }) => {
      if ( status === 401) {
        return ({ error: 'Please login to access this feature' });
      }
      return ({ error });
    });
};

export const getHighlights = (articleId) => (dispatch) => {
  dispatch({ type: CLEAR_HIGHLIGHTS });

  return axios
    .get(`${API_ROOT_URL}/articles/${articleId}/highlights`)
    .then((response) => {
      const { data: { data: { highlights } } } = response;

      dispatch({
        type: GET_HIGHLIGHTS,
        payload: highlights
      });
    })
    .catch(() => { });
}