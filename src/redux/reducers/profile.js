import { SET_OWN_PROFILE, UPDATE_PROFILE, GET_USER_BOOKMARKS_SUCCESS, REMOVE_OWN_PROFILE} from '../actions/types';

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

    case GET_USER_BOOKMARKS_SUCCESS:
      return { ...state, bookmarks: action.payload }

    default:
      return state;
  }
};
