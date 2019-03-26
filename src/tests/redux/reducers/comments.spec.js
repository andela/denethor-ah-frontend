import commentsReducer from '../../../redux/reducers/comments';
import { comments, commentsLikes, commentImpression } from '../../mock-data/comments';
import {
  ADD_COMMENT, 
  REMOVE_COMMENT, 
  ADD_COMMENT_FAILURE, 
  GET_COMMENT_SUCCESS, 
  LIKE_COMMENT_REQUEST, 
  COMMENT_IMPRESSION_SUCCESS,
  GET_COMMENT_LIKES_COUNT_SUCCESS
} from '../../../redux/actions/types';
import { commentReducerDefaultState } from '../../../redux/reducers/comments'


it('Should return default state when initialized', () => {
  const state = commentsReducer(commentReducerDefaultState, {
    type: '@@INIT'
  });
  expect(state).toEqual(commentReducerDefaultState);
});

it('Should add comments to store', () => {
  const initialState = {
    comments: [],
    loading: true,
    commentLikes: []
  };
  const state = commentsReducer(initialState, {
    type: ADD_COMMENT,
    comments
  });
  expect(state).toEqual({...initialState } );
});

it('Should return new state when add comment fails ', () => {
  const initialState = {
    comments: [],
    loading: false,
    commentLikes: []
  };
  const state = commentsReducer(initialState, {
    type: ADD_COMMENT_FAILURE
  });
  expect(state).toEqual({...initialState } );
});

it('Should get comments from store', () => {
  const initialState = {
    comments: [],
    commentLikes: []
  };
  const state = commentsReducer(initialState, {
    type: GET_COMMENT_SUCCESS,
    comments
  });
  expect(state.comments.length).toEqual(comments.length );
});


it('Should remove comments from store', () => {
  const initialLength = comments.length;
  const state = commentsReducer(comments, {
    type: REMOVE_COMMENT,
    id: comments[0].id
  });
  expect(state.length).toEqual(initialLength - 1);
});

it('Should add comment likes to store', () => {
  const initialState = {
    comments: [],
    loading: true,
    commentLikes: []
  };
  const state = commentsReducer(initialState, {
    type: LIKE_COMMENT_REQUEST
  });
  expect(state).toEqual({...initialState } );
});
it('Should add comment likes to store and return new state', () => {
  const initialState = {
    comments: [],
    loading: true,
    commentsLikes
  };
  const state = commentsReducer(initialState, {
    type: COMMENT_IMPRESSION_SUCCESS,
    commentImpression
  });
  expect(state.commentsLikes.length).toEqual(commentsLikes.length + 1);
});

it('Should get number of likes from store and return new state', () => {
  const initialState = {
    comments: [],
    loading: true,
    commentsLikes: []
  };
  const state = commentsReducer(initialState, {
    type: GET_COMMENT_LIKES_COUNT_SUCCESS,
    commentsLikes: commentsLikes
  });
  expect(state.commentsLikes.length).toEqual(commentsLikes.length);
});