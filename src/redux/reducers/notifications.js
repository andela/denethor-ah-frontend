import { SET_NOTIFICATIONS, REMOVE_NOTIFICATION } from '../actions/types';

const notificationsDefaultState = [];

const notificationsReducer = (state = notificationsDefaultState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.payload;

    case REMOVE_NOTIFICATION:
      return state.map((notification) => ({
        ...notification,
        ...(notification.articleId === action.payload && { read: true })
      }));

    default:
      return state;
  }
};

export default notificationsReducer;
