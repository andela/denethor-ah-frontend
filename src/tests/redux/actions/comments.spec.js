import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import decodeJwt from 'jwt-decode';

import {
  getCommentSuccess,
  removeComment,
  getArticleComments,
  addComment,
  getAllCommentsImpression,
  likeComment
} from '../../../redux/actions/comments';
import {
  comments,
  commentsLikes,
  count
} from '../../mock-data/comments';
import axios from '../../../utils/axiosConfig';

const createMockStore = configureMockStore([thunk]);

jest.mock('../../../utils/axiosConfig');
jest.mock('jwt-decode');

describe('Article actions', () => {
  const store = createMockStore({});
  beforeEach(() => {
    store.clearActions();
  });

  it('Should get the initial state of the store', () => {
    const store = createMockStore({});
    store.dispatch(getCommentSuccess(comments[0]));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'GET_COMMENT_SUCCESS',
      comments: comments[0]
    });
  });

  it('Should add comment when submit is clicked', async () => {
    const mockData = comments;
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          comments: mockData
        }
      }),
    )
    const expectedActions = [{
      type: 'ADD_COMMENT'
    }];
    await store.dispatch(addComment('8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a', 'Peace is a good girl'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should throw an error commment body is empty', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject('an error occurred'),
    )
    try {
      await store.dispatch(addComment('8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a', ''));
    } catch (error) {
      expect(error).toEqual('an error occurred');
    }
  });



  it('Should remove comments from store', () => {
    const store = createMockStore({});
    store.dispatch(removeComment(comments[0].id));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'REMOVE_COMMENT',
      id: comments[0].id
    });
  });


  it('should get all Article Comments`', async () => {
    const store = createMockStore({
      comments: []
    });
    const mockData = [...comments];
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          articleComments: mockData
        }
      }),
    )
    const expectedActions = [{
      comments: mockData,
      type: 'GET_COMMENT_SUCCESS'
    }, ];
    await store.dispatch(getArticleComments(comments[0].articleId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should like or unlike a Comment', async () => {
    const mockData = commentsLikes;
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({data: {status: 'success'}})
    );
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          count,
          commentLikes: mockData
        }
      }),
    );
    decodeJwt.mockImplementationOnce(() => ({
      id: 'chinchin'
    }));
    await store.dispatch(likeComment('8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a'));
  });

  it('should throw error to like or unlike a Comment in request is invalid', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject('an error occurred')
    );
  
    try {
      decodeJwt.mockImplementation(() => ({
        id: 'chinchin'
      }));
      await store.dispatch(likeComment('8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a'));
    } catch (error) {
      expect(error).toEqual('an error occurred');
    }
  });

  it('should get all likes of a Comment`', async () => {
    const commentId = [
      "45d091a1-2541-406c-910e-6a4ecfa5d471",
      "1a5355cb-1380-4bcc-8e9d-9abc6f5f9a72",
      "4a23ed9b-07ee-40c7-a83a-b3a8739dca55"
    ]
  
    const mockData = commentsLikes;
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          count,
          commentLikes: mockData
        }
      }),
    );
    decodeJwt.mockImplementation(() => ({
      id: 'chinchin'
    }));
    await store.dispatch(getAllCommentsImpression(commentId));
  });
});