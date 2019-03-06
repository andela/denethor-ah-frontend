import actions from './types';


export const addArticle = article => (dispatch) => {
  dispatch({
    type: actions.ADD_ARTICLE,
    article
  });
};

export const removeArticle = id => (dispatch) => {
  dispatch({
    type: actions.REMOVE_ARTICLE,
    id
  });
};