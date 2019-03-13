import actions from '../actions/types'

const { SET_OWN_PROFILE, REMOVE_PROFILE, UPDATE_PROFILE } = actions;

const profileDefaultState = {

};

export default (state = profileDefaultState, action) => {
  switch (action.type) {
    case SET_OWN_PROFILE:
      return action.payload;

    case UPDATE_PROFILE:
      return {...state, ...action.updates};

    case REMOVE_PROFILE:
      return {};

    default:
      return state;
  }
};
