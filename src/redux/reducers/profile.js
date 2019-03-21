import { SET_OWN_PROFILE, REMOVE_OWN_PROFILE, UPDATE_PROFILE } from '../actions/types';

const profileDefaultState = {

};

export default (state = profileDefaultState, action) => {
  switch (action.type) {
    case SET_OWN_PROFILE:
      return action.payload;

    case UPDATE_PROFILE:
      return {...state, ...action.payload};

    case REMOVE_OWN_PROFILE:
      return {};

    default:
      return state;
  }
};
