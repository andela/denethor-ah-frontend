import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addComment, removeComment } from '../../../redux/actions/comments';
import comments from '../../mock-data/comments';

const createMockStore = configureMockStore([thunk]);

it('Should add comments to store', () => {
  const store = createMockStore({});
  store.dispatch(addComment(comments[0]));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'ADD_COMMENT',
    comment: comments[0]
  });
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
