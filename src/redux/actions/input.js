import { ADD_INPUT_DATA, CLEAR_INPUT_DATA } from "./types";

export const saveInput = payload => dispatch => {
  dispatch({
    type: ADD_INPUT_DATA,
    payload
  });
}

export const clearInput = (process) => dispatch => {
  dispatch({
    type: CLEAR_INPUT_DATA,
    payload: { process }
  });
}