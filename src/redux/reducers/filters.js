import { GET_FILTERED_ARTICLES, CLEAR_FILTERED_ARTICLES } from '../actions/types';

const filterDefaultState = [];

const filterReducer = (state = filterDefaultState, action) => {
  const { type, payload } = action; 

  switch (type) {
    case GET_FILTERED_ARTICLES:
      return [...payload];
    case CLEAR_FILTERED_ARTICLES:
      return [];
    default:
      return state;
  }
}

export default filterReducer;