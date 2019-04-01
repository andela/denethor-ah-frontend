import { ADD_INPUT_DATA, CLEAR_INPUT_DATA } from '../actions/types';

const initialState = {
  createArticle: {}
};

const inputDataReducer = (state = initialState, action) => {
  let process, field, value;
  let newState;
  switch(action.type) {
    case ADD_INPUT_DATA:
      ({ payload: { process, field, value }} = action);
      return {
        ...state,
        [process]: {
          ...state[process],
          [field]: value
        }
      }
    case CLEAR_INPUT_DATA:
      newState = {...state};
      delete newState[process];
      return newState;
    default:
      return state;
  }
}

export default inputDataReducer;