import { GET_ARTICLES_SUCCESS , ADD_ARTICLE , REMOVE_ARTICLE} from '../actions/types'

const articleReducerDefaultState = [];

export default (state = articleReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.article];

    case REMOVE_ARTICLE:
      return state.filter(({ id }) => id !== action.id );

    case GET_ARTICLES_SUCCESS:
      return [...action.payload];

    default:
      return state;
  }
};
