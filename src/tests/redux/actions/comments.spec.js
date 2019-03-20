import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getCommentSuccess, removeComment, getArticleComments, addComment } from '../../../redux/actions/comments';
import { comments } from '../../mock-data/comments';
import axios from '../../../utils/axiosConfig';

const createMockStore = configureMockStore([thunk]);
jest.mock('../../../utils/axiosConfig');

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

it('Should add comment when submit is clicked', async() => {
  const mockData = comments;
  axios.post.mockImplementationOnce(() =>
    Promise.resolve({ data: { comments: mockData } }),
  )
  const expectedActions = [{
    type: 'ADD_COMMENT'
  }];
  await store.dispatch(addComment('8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a', 'Peace is a good girl'));
  expect(store.getActions()).toEqual(expectedActions);
});

it('Should throw an error commment body is emoty', async() => {
  axios.post.mockImplementationOnce(() =>
    Promise.reject('an error occurred'),
  )
  try {
    await store.dispatch(addComment({ 
      articleId: '8ee5e8ed-ecdf-41c1-9b94-6c6bb712a77a',
      commentBody: '' 
    }));
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

  
it('should get all Article Comments`', async() => {
  const store = createMockStore({ comments: [] });
  const mockData = [...comments];
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { articleComments: mockData } }),
    )
    const expectedActions = [
      {
        comments: mockData,
        type: 'GET_COMMENT_SUCCESS'
      },
    ];
    await store.dispatch(getArticleComments(comments[0].articleId));
    expect(store.getActions()).toEqual(expectedActions);
});
});
