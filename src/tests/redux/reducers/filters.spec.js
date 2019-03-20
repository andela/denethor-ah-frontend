import '@babel/polyfill';
import filterReducer from '../../../redux/reducers/filters';
import { GET_FILTERED_ARTICLES } from '../../../redux/actions/types';
import articles from '../../mock-data/articles';

it('Should return default state when initialized', () => {
  const state = filterReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('Should get Filtered Articles from store', () => {
  const state = filterReducer(articles, {
    type: GET_FILTERED_ARTICLES,
    payload: articles
  });
  expect(state.length).toEqual(articles.length);
});