import { ADD_ARTICLE, REMOVE_ARTICLE } from './types';


export const addArticle = article => (dispatch) => {
  dispatch({
    type: ADD_ARTICLE,
    article
  });
};

export const removeArticle = id => (dispatch) => {
  dispatch({
    type: REMOVE_ARTICLE,
    id
  });
};