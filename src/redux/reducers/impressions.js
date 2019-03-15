import { 
  LIKE_ARTICLE_SUCCESS, 
  DISLIKE_ARTICLE_SUCCESS, 
  GET_ARTICLE_LIKES_SUCCESS, 
  GET_ARTICLE_DISLIKES_SUCCESS,
  BOOKMARK_ARTICLE_SUCCESS,
  REMOVE_ARTICLE_BOOKMARK_SUCCESS,
  GET_ARTICLE_RATINGS_SUCCESS,
  RATE_ARTICLE_SUCCESS,
  GET_USER_BOOKMARKS_SUCCESS,
} 
from '../actions/types';

const impressionReducerDefaultState = {
  likes: [],
  dislikes: [],
  ratings: [],
  userBookmarks: [],
}

const impressionReducer = (state = impressionReducerDefaultState, action) => {
  const { type, payload } = action;
  let likes;
  let dislikes;

  switch (type) {
    case GET_ARTICLE_LIKES_SUCCESS:
      return { ...state, likes: action.payload }

    case GET_ARTICLE_DISLIKES_SUCCESS:
      return { ...state, dislikes: action.payload }

    case LIKE_ARTICLE_SUCCESS:
      if (!payload.impression) return state;

      if (payload.impression.likeImpression) {
        dislikes = [...state.dislikes.filter(like => like.userId !== payload.impression.userId)]
        return {...state, dislikes, likes: [...state.likes, payload.impression]}
      }
      
      likes = [...state.likes.filter(like => like.id !== payload.impression.id)]
      return {...state, likes };

    
    case DISLIKE_ARTICLE_SUCCESS:
      if (!payload.impression) return state;

      if (payload.impression.dislikeImpression) {
        likes = [...state.likes.filter(like => like.userId !== payload.impression.userId)]
        return { ...state, likes, dislikes: [ ...state.dislikes, payload.impression ] }
      }

      dislikes = [...state.dislikes.filter(dislike => dislike.id !== payload.impression.id)]
      return {...state, dislikes };

    case RATE_ARTICLE_SUCCESS:
      return state

    case GET_ARTICLE_RATINGS_SUCCESS:
      return { ...state, ratings: action.payload }
    
    case BOOKMARK_ARTICLE_SUCCESS:
      return {...state, userBookMarked: true }

    case REMOVE_ARTICLE_BOOKMARK_SUCCESS:
      return {...state, userBookMarked: false }

    case GET_USER_BOOKMARKS_SUCCESS:
      return {...state, userBookmarks: action.payload}

    default:
      return state;
  }
};

export default impressionReducer;