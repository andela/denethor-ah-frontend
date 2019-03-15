import { 
  ADD_ARTICLE, 
  REMOVE_ARTICLE, 
  GET_ARTICLES_SUCCESS, 
  GET_ONE_ARTICLE_SUCCESS, 
  RATE_ARTICLE_SUCCESS, 
  GET_ARTICLE_AVERAGE_RATING_SUCCESS,
  LIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_SUCCESS
} from '../actions/types'
import uniqueBy from 'unique-by';

const articleReducerDefaultState = [];

export default (state = articleReducerDefaultState, action) => {
  let newState;
  let allArticles;
  let ratingInfo;
  let foundArticle;
  let count, averageRating;
  let articleIndex;

  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.article];

    case REMOVE_ARTICLE:
      return state.filter(({ id }) => id !== action.id );
    
    case GET_ARTICLES_SUCCESS:
      newState = [...state, ...action.payload];
      return uniqueBy(newState, 'id');
    
    case GET_ONE_ARTICLE_SUCCESS:
      newState = [...state, action.payload];
      return uniqueBy(newState, 'id');

    case RATE_ARTICLE_SUCCESS:
      allArticles = [...state];
      allArticles.forEach((article, index) => {
        if(article.id === action.payload.id) {
          articleIndex = index;
        }
      });

      foundArticle = allArticles[articleIndex];
      foundArticle = {...foundArticle, ...action.payload};

      allArticles[articleIndex] = foundArticle;

      return allArticles;

    case GET_ARTICLE_AVERAGE_RATING_SUCCESS:
      allArticles = [...state];
      ratingInfo = action.payload;
      foundArticle = allArticles.find(article => article.id === action.payload.articleId);

      ({ count = 0, rows: [{ averageRating = 0 } = {}] } = ratingInfo);
      averageRating = Math.ceil(averageRating);
      foundArticle.ratingsCount = count;
      foundArticle.averageRating = averageRating;

      allArticles.forEach((article, index) => {
        if(article.id === foundArticle.id) {
          articleIndex = index;
        }
      });

      allArticles[articleIndex] = foundArticle;
      return allArticles;

      case LIKE_ARTICLE_SUCCESS:
        newState = [...state, action.payload];
        return newState;

      case DISLIKE_ARTICLE_SUCCESS:
        newState = [...state, action.payload];
        return newState;

      case BOOKMARK_ARTICLE_SUCCESS:
        newState = [...state, action.payload];
        return newState;

    default:
      return state;
  }
};
