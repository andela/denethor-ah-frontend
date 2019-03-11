import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios'
import { addArticle, removeArticle, getArticles, getOneArticle } from '../../../redux/actions/articles';
import articles from '../../mock-data/articles';
import {
  GET_ONE_ARTICLE_SUCCESS
} from '../../../redux/actions/types';

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
    const mockData = articles;
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

  it('should handle GET_ONE_ARTICLE_SUCCESS when fetching articles is completed', async () => {
    const store = createMockStore({ articles: [] });
    const response = {
      data: {
        data: articles[0]
      }
    };

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(response),
    )
  
    await store.dispatch(getOneArticle(articles[0].id));
    const expectedActions = store.getActions();
    
    expect(expectedActions).toContainEqual(
      { type: GET_ONE_ARTICLE_SUCCESS, payload: articles[0] },
    )
  });
})