import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_COMMENT_FAILURE,
  GET_COMMENT_SUCCESS,
  COMMENT_IMPRESSION_SUCCESS,
  GET_COMMENT_LIKES_COUNT_SUCCESS
} from '../actions/types';

export const commentReducerDefaultState = {
  comments: [],
  loading: false,
  commentsLikes: []
};

const commentReducer = (state = commentReducerDefaultState, action) => {
  let {
    commentsLikes
  } = state;
  const {
    commentImpression
  } = action;

  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        loading: true
      }

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...action.comments],
        loading: false
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        loading: false
      }

    case REMOVE_COMMENT:
      return state.filter(({
        id
      }) => id !== action.id);

    case COMMENT_IMPRESSION_SUCCESS:
      {
        const filteredCommentsLikes = commentsLikes.filter(commentLike => 
          commentLike.commentId !== commentImpression.commentId
        );

        return {
          ...state,
          commentsLikes: [...filteredCommentsLikes, commentImpression]
        }
      }

    case GET_COMMENT_LIKES_COUNT_SUCCESS:
      return {
        ...state,
        commentsLikes: [...action.commentsLikes]
      }

    default:
      return state;
  }
};

export default commentReducer;