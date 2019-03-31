import axios from '../../utils/axiosConfig';

import { ADD_TAG, REMOVE_TAG, GET_TAGS} from './types';

const { API_ROOT_URL } = process.env;

export const addTag = tag => (dispatch) => {
  dispatch({
    type: ADD_TAG,
    payload: tag
  });
};

export const removeTag = tag => (dispatch) => {
  dispatch({
    type: REMOVE_TAG,
    payload: tag
  });
};

export const getTags = () => (dispatch) => {
  return axios
    .get(`${API_ROOT_URL}/tags`)
    .then((response) => {
      const { data: { data: { tags } } } = response;

      dispatch({
        type: GET_TAGS,
        payload: tags
      });
    })
    .catch(() => {  });
}
