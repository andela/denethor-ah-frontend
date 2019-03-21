import socket from '../../utils/socket';
import { REMOVE_NOTIFICATION } from './types';

export const removeNotifications = (articleId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_NOTIFICATION,
    payload: articleId
  });

  const { notifications } = getState();

  socket.emit('setRemainingNotifications', notifications);
}
