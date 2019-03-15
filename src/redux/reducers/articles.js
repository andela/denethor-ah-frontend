import { 
  ADD_ARTICLE, 
  REMOVE_ARTICLE, 
  GET_ARTICLES_SUCCESS, 
  GET_ONE_ARTICLE_SUCCESS, 
  RATE_ARTICLE_SUCCESS, 
  GET_ARTICLE_AVERAGE_RATING_SUCCESS,
  LIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_SUCCESS,
  GET_ARTICLE_LIKES_SUCCESS,
  GET_ARTICLE_DISLIKES_SUCCESS
} from '../actions/types'
import uniqueBy from 'unique-by';

const articleReducerDefaultState = [];

export default (state = articleReducerDefaultState, action) => {
  let newState;
  let allArticles;
  let ratingInfoArray;
  let foundArticle;
  let averageRating=0;
  let articleIndex;
  let dislikeInfo;
  let articleWithCurrentUser;
  let currentUser;

  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.article];

    case REMOVE_ARTICLE:
      return state.filter(({ id }) => id !== action.id );
    
    case GET_ARTICLES_SUCCESS:
      newState = [...state, ...action.payload];
      return uniqueBy(newState, 'id');
    
    case GET_ONE_ARTICLE_SUCCESS:
      articleWithCurrentUser = action.payload.article
      if (action.payload.userId === undefined ) {
        articleWithCurrentUser.userId = '';
      } else {
        articleWithCurrentUser.userId = action.payload.userId
      }
      newState = [...state, articleWithCurrentUser];
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
      ratingInfoArray = action.payload;
      currentUser = allArticles[0].userId;

      if (ratingInfoArray.length < 1) {
        allArticles[0].ratingsCount = ratingInfoArray.length
        allArticles[0].currentUserRated = false;
      } else {
          ratingInfoArray.forEach((rating)=> {
            averageRating += parseInt(rating.rating)   
            
            if(currentUser == rating.userId) {
              foundArticle.currentUserRated = true
            }
            foundArticle.currentUserRated = false
          })

        foundArticle = allArticles.find(article => article.id === action.payload[0].articleId); 
        foundArticle.averageRating = Math.round((averageRating/(action.payload.length)));
        foundArticle.ratingsCount = action.payload.length;
        }

        allArticles.forEach((article, index) => {
          if(article.id === action.payload.id) {
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

      case GET_ARTICLE_LIKES_SUCCESS:
        if (action.payload.length < 1) return state;
        
        foundArticle = state.find(article => article.id === action.payload[0].articleId); 
        foundArticle.totalLikes = action.payload.length;
        foundArticle.currentUserLiked = action.payload.includes(like => like.userId == foundArticle.userId)

        // remove the previous article, add the update article
        allArticles = [...state.filter(article => article.id != foundArticle.id), foundArticle]
        return allArticles;

      case GET_ARTICLE_DISLIKES_SUCCESS:
        allArticles = [...state];
        dislikeInfo = action.payload.length;
        currentUser = allArticles[0].userId;

        if (dislikeInfo < 1) {
          allArticles[0].totalDislikes = 0;
          allArticles[0].currentUserDisliked = false;
        } else {
            foundArticle = allArticles.find(article => article.id === action.payload[0].articleId); 
            foundArticle.totalDislikes = action.payload.length;

            action.payload.forEach(dislikeData => {
              if(currentUser == dislikeData.userId) {
                foundArticle.currentUserDisliked = true
              }
              foundArticle.currentUserDisliked = false
            })
        }

        return allArticles;
      
    default:
      return state;
  }
};
