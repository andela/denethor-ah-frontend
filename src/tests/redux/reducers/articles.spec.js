import articlesReducer from '../../../redux/reducers/articles';
import articles from '../../mock-data/articles';
import { ADD_ARTICLE, REMOVE_ARTICLE , GET_ARTICLES_SUCCESS} from '../../../redux/actions/types';

it('Should return default state when initialized', () => {
  const state = articlesReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('Should add articles to store', () => {
  const state = articlesReducer(articles, {
    type: ADD_ARTICLE,
    article: articles[0]
  });
  expect(state).toEqual([...articles, articles[0]]);
});

it('Should remove articles from store', () => {
  const initialLength = articles.length;
  const state = articlesReducer(articles, {
    type: REMOVE_ARTICLE,
    id: articles[0].id
  });
  expect(state.length).toEqual(initialLength - 1);
});

it('Should get articles from store', () => {
  const state = articlesReducer(articles, {
    type: GET_ARTICLES_SUCCESS,
    payload: [{id: 234},{id: 654}]
  });
  expect(state.length).toEqual(2);
});
