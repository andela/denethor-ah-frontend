import axios from '../../utils/axiosConfig';
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENT_SUCCESS
} from './types';

const BASE_URL = process.env.API_ROOT_URL;

export const addCommentRequest = () => ({
  type: ADD_COMMENT
});

export const getCommentSuccess = comments => ({
  type: GET_COMMENT_SUCCESS,
  comments
});

export const getArticleComments = (articleId) => async (dispatch) => {
    const { data: { articleComments } } = await axios.get(`${BASE_URL}/articles/${articleId}/comments`);
    dispatch(getCommentSuccess(articleComments));
};
export const addComment = ({ articleId, commentBody }) => async (dispatch) => {
  try {
    dispatch(addCommentRequest());
    await axios.post(`${BASE_URL}/articles/${articleId}/comments`, { commentBody });
    dispatch(getArticleComments(articleId));
  } catch (error) {
    throw error;
  }
};


export const removeComment = id => (dispatch) => {
  dispatch({
    type: REMOVE_COMMENT,
    id
  });
};