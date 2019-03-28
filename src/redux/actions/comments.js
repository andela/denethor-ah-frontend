import decodeJwt from 'jwt-decode';

import axios from '../../utils/axiosConfig';
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_COMMENT_FAILURE,
  GET_COMMENT_SUCCESS,
  COMMENT_IMPRESSION_SUCCESS,
  GET_COMMENT_LIKES_COUNT_SUCCESS
} from './types';

const BASE_URL = process.env.API_ROOT_URL;

export const addCommentRequest = () => ({
  type: ADD_COMMENT
});

export const getCommentSuccess = comments => ({
  type: GET_COMMENT_SUCCESS,
  comments
});

export const addCommentFailure = () => ({
  type: ADD_COMMENT_FAILURE
});

export const CommentImpressionSuccess = (commentImpression) => ({
  type: COMMENT_IMPRESSION_SUCCESS,
  commentImpression
})
export const getCommentslikesCountSuccess = (commentsLikes) => ({
  type: GET_COMMENT_LIKES_COUNT_SUCCESS,
  commentsLikes
})

export const getArticleComments = (articleId) => async (dispatch) => {
  const {
    data: {
      articleComments
    }
  } = await axios.get(`${BASE_URL}/articles/${articleId}/comments`);console.log(articleComments);
  dispatch(getCommentSuccess(articleComments));
};

export const addComment = ({
  articleId,
  commentBody
}) => async (dispatch) => {
  try {
    dispatch(addCommentRequest());
    await axios.post(`${BASE_URL}/articles/${articleId}/comments`, {
      commentBody
    });
    dispatch(getArticleComments(articleId));
  } catch (error) {
    dispatch(addCommentFailure())
    throw error;
  }
};

export const editComment = (
  articleId,
  commentId,
  commentBody
) => async (dispatch) => {
  try {
    dispatch(addCommentRequest());
    await axios.patch(`${BASE_URL}/articles/${articleId}/comments/${commentId}`, {
      commentBody
    });
    dispatch(getArticleComments(articleId));
  } catch (error) {
    dispatch(addCommentFailure())
    throw error;
  }
};

export const removeComment = id => (dispatch) => {
  dispatch({
    type: REMOVE_COMMENT,
    id
  });
};
export const getCommentImpression = async (commentId) => {
  const {
    data: {
      count,
      commentLikes
    }
  } = await axios.get(`${BASE_URL}/comments/${commentId}/likes`);
  const token = localStorage.getItem('token');
  const {
    id: userId
  } = decodeJwt(token);
  const liked = commentLikes.some(
    ({
      userId: likerId
    }) => likerId === userId);
  return {
    commentId,
    count,
    liked
  };
}
export const getAllCommentsImpression = (commentsIds) => async (dispatch) => {
  const commentsLikes = await Promise.all(
    commentsIds.map(async commentId => {
      const commentImpression = await getCommentImpression(commentId);
      return commentImpression;
    }),
  );
  dispatch(getCommentslikesCountSuccess(commentsLikes));
}

export const likeComment = (commentId) => async (dispatch) => {
  try {
    const {data: {status}} = await axios.post(`${BASE_URL}/comments/${commentId}/likes`);
    if (status === 'success') {
      dispatch(CommentImpressionSuccess(await getCommentImpression(commentId)));
    }
  } catch (error) {
    throw error;
  }
}
