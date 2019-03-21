import commentsReducer from '../../../redux/reducers/comments';
import { comments } from '../../mock-data/comments';
import {ADD_COMMENT, REMOVE_COMMENT, ADD_COMMENT_FAILURE, GET_COMMENT_SUCCESS} from '../../../redux/actions/types';
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
    loading: true
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
    loading: false
  };
  const state = commentsReducer(initialState, {
    type: ADD_COMMENT_FAILURE
  });
  expect(state).toEqual({...initialState } );
});

it('Should get comments from store', () => {
  const initialState = {
    comments: []
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
