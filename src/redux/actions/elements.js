import {
  TOGGLE_SIDEBAR_STATUS
} from './types';


export const toggleMobileSideBar = () => dispatch => {
  dispatch({
    type: TOGGLE_SIDEBAR_STATUS
  });
}