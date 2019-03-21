import { SET_NOTIFICATIONS, REMOVE_NOTIFICATION } from '../actions/types';

const notificationsDefaultState = [];

const notificationsReducer = (state = notificationsDefaultState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.payload;

    case REMOVE_NOTIFICATION:
      return state.filter(({ articleId }) => articleId !== action.payload);

    default:
      return state;
  }
};

export default notificationsReducer;
