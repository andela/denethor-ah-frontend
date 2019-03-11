import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addArticle, removeArticle } from '../../../redux/actions/articles';
import articles from '../../mock-data/articles';

const createMockStore = configureMockStore([thunk]);

it('Should add articles to store', () => {
  const store = createMockStore({});
  store.dispatch(addArticle(articles[0]));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'ADD_ARTICLE',
    article: articles[0]
  });
});

it('Should remove articles from store', () => {
  const store = createMockStore({});
  store.dispatch(removeArticle(articles[0].id));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'REMOVE_ARTICLE',
    id: articles[0].id
  });
});
