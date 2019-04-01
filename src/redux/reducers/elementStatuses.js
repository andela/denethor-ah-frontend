import {
  TOGGLE_SIDEBAR_STATUS,
  CHANGE_MOBILE_AUTH_ACTION,
  DEACTIVATE_MOBILE_AUTH_ACTION,
  ACTIVATE_MOBILE_AUTH_ACTION
} from '../actions/types';

const initialState = {
  sideBarActive: false,
  quickAuthAction: {
    active: false,
    currentAction: 'login', // 'signup' || 'login'
  }
};

const elementStatusesReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_SIDEBAR_STATUS:
      return {
        ...state, sideBarActive: !state.sideBarActive
      }

    case CHANGE_MOBILE_AUTH_ACTION:
      return {
        ...state, quickAuthAction: { ...state.quickAuthAction, active: true, currentAction: action.payload }
      }

    case DEACTIVATE_MOBILE_AUTH_ACTION:
      return {
        ...state, quickAuthAction: { ...state.quickAuthAction, active: false }
      }
    
    case ACTIVATE_MOBILE_AUTH_ACTION:
      return {
        ...state, quickAuthAction: { ...state.quickAuthAction, active: true }
      }

    default: 
      return state;
  }
}

export default elementStatusesReducer;