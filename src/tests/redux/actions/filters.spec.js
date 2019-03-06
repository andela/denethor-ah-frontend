import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../../../utils/axiosConfig';
import MockAdapter from 'axios-mock-adapter';
import { getFilteredArticles } from '../../../redux/actions/filters';
import { GET_FILTERED_ARTICLES } from '../../../redux/actions/types';
import articles from '../../mock-data/articles';
import { extractImageFromBody } from '../../../utils/imageExtractor';
import { toTimeFromNow } from '../../../utils/dateTime';

const createMockStore = configureMockStore([thunk]);
const { API_ROOT_URL } = process.env;
const mock = new MockAdapter(axios);

describe('Filters actions', () => {
  it('Should get Filtered Articles from store', async () => {
    const store = createMockStore({ filters: [] });

    mock.onGet(`${API_ROOT_URL}/articles/filter?searchStr=the`).reply(200, {
      status: 'success',
      data: { articles: [...articles] }
    })
   
    const expectedActions = [
      {
        type: GET_FILTERED_ARTICLES,
        payload: [...articles].map((article) => {
          article.featuredImage = extractImageFromBody(article.body);
          article.dateCreated = toTimeFromNow(article.createdAt);
          return article;
        }),
      },
    ];
    
    await store.dispatch(getFilteredArticles('the'));
    expect(store.getActions()).toEqual(expectedActions);
  });
})