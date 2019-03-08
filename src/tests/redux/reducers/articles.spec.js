import articlesReducer from '../../../redux/reducers/articles';
import articles from '../../mock-data/articles';
import actions from '../../../redux/actions/types';

it('Should return default state when initialized', () => {
  const state = articlesReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('Should add articles to store', () => {
  const state = articlesReducer(articles, {
    type: actions.ADD_ARTICLE,
    article: articles[0]
  });
  expect(state).toEqual([...articles, articles[0]]);
});

it('Should remove articles from store', () => {
  const initialLength = articles.length;
  const state = articlesReducer(articles, {
    type: actions.REMOVE_ARTICLE,
    id: articles[0].id
  });
  expect(state.length).toEqual(initialLength - 1);
});
