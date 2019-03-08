import actions from '../actions/types'

const { ADD_ARTICLE, REMOVE_ARTICLE } = actions;

const articleReducerDefaultState = [];

export default (state = articleReducerDefaultState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return [...state, action.article];

    case REMOVE_ARTICLE:
      return state.filter(({ id }) => id !== action.id );

    default:
      return state;
  }
};
