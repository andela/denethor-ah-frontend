import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios'
import { addArticle, removeArticle, getArticles } from '../../../redux/actions/articles';
import articles from '../../mock-data/articles';

const createMockStore = configureMockStore([thunk]);
describe('Article actions', () => {
  const store = createMockStore({});
  beforeEach(() => { 
    store.clearActions();
  });

  it('Should add articles to store', () => {
    store.dispatch(addArticle(articles[0]));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'ADD_ARTICLE',
      article: articles[0]
    });
  });

  it('Should remove articles from store', () => {
    store.dispatch(removeArticle(articles[0].id));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'REMOVE_ARTICLE',
      id: articles[0].id
    });
  });

  it('Should get articles from store', async() => {
    const mockData = [{id: 1}, {id: 2}]
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { data: mockData } }),
    )
    const expectedActions = [
      {
        payload: mockData,
        type: 'GET_ARTICLES_SUCCESS',
      },
    ];
    await store.dispatch(getArticles());
    expect(store.getActions()).toEqual(expectedActions);
  });
})





