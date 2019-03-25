import '@babel/polyfill';
import articlesReducer from '../../../redux/reducers/articles';
import articles from '../../mock-data/articles';
import {
  ADD_ARTICLE,
  REMOVE_ARTICLE,
  GET_ARTICLES_SUCCESS,
  // GET_ONE_ARTICLE_SUCCESS,
  RATE_ARTICLE_SUCCESS,
  // GET_ARTICLE_AVERAGE_RATING_SUCCESS,
  // LIKE_ARTICLE_SUCCESS,
  // DISLIKE_ARTICLE_SUCCESS,
  // BOOKMARK_ARTICLE_SUCCESS,
} from '../../../redux/actions/types';

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
    payload: articles
  });
  expect(state.length).toEqual(articles.length);
});

it('Should handle GET_ARTICLES_SUCCESS ', () => {
  const state = articlesReducer([], {
    type: GET_ARTICLES_SUCCESS,
    payload: articles
  });
  expect(state.length).toEqual(articles.length);
});

// it('Should handle GET_ONE_ARTICLE_SUCCESS', () => {
//   const state = articlesReducer([], {
//     type: GET_ONE_ARTICLE_SUCCESS,
//     payload: articles[0]
//   });
//   expect(state.length).toEqual(articles.length);
// });

it('Should handle RATE_ARTICLE_SUCCESS', () => {
  const ratedArticle = { ...articles[0], averageRating: 4.54345, ratingsCount: 1 };
  const state = articlesReducer(articles, {
    type: RATE_ARTICLE_SUCCESS,
    payload: ratedArticle
  });
  // expect(state).toContainEqual(ratedArticle);
});

// it('Should handle GET_ARTICLE_AVERAGE_RATING_SUCCESS', () => {
//   const ratingInfo = {articleId: articles[0].id, count: 5, rows: []}
//   const state = articlesReducer(articles, {
//     type: GET_ARTICLE_AVERAGE_RATING_SUCCESS,
//     payload: ratingInfo
//   });
//   expect(state).toContainEqual({ ...articles[0], ratingsCount: 5, averageRating: 0 });
// });
