import actions from '../actions/types'

const { GET_PROFILE, REMOVE_PROFILE, UPDATE_PROFILE } = actions;

const profileDefaultState = {

};

export default (state = profileDefaultState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.profile;

    case UPDATE_PROFILE:
      return {...state, ...action.updates};

    case REMOVE_PROFILE:
      return {};

    default:
      return state;
  }
};
