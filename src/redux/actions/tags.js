import { ADD_TAG, REMOVE_TAG} from './types';


export const addTag = tag => (dispatch) => {
  dispatch({
    type: ADD_TAG,
    tag
  });
};

export const removeTag = tag => (dispatch) => {
  dispatch({
    type: REMOVE_TAG,
    tag
  });
};
