import actions from './types';

export const getProfile = id => (dispatch) => {
  dispatch({
    type: actions.GET_PROFILE,
    profile: id // placeholder pending profile feature
  });
};

export const updateProfile = profile => (dispatch) => {
  dispatch({
    type: actions.UPDATE_PROFILE,
    profile
  });
};

export const removeProfile = () => (dispatch) => {
  dispatch({
    type: actions.REMOVE_PROFILE,
  });
};
