import {
  TOGGLE_SIDEBAR_STATUS
} from '../actions/types';

const initialState = {
  sideBarActive: false
};

const elementStatusesReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_SIDEBAR_STATUS:
      return {
        ...state, sideBarActive: !state.sideBarActive
      }

    default: 
      return state;
  }
}

export default elementStatusesReducer;