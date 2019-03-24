import uniqueBy from 'unique-by';
import { 
  ADD_ARTICLE, 
  REMOVE_ARTICLE, 
  GET_ARTICLES_SUCCESS, 
  GET_ONE_ARTICLE_SUCCESS,
} from '../actions/types'

const articleReducerDefaultState = [];

export default (state = articleReducerDefaultState, action) => {
  let newState;

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
    
    default:
      return state;
  }
};
