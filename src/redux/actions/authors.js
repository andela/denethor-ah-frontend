import axios from '../../utils/axiosConfig';

import { GET_AUTHORS } from './types';

const { API_ROOT_URL } = process.env;

export const getAuthors = () => (dispatch) => {
  return axios
    .get(`${API_ROOT_URL}/users`)
    .then((response) => {
      const { data: { data: { users } } } = response;

      dispatch({
        type: GET_AUTHORS,
        payload: users
      });
    })
    .catch(() => {  });
}