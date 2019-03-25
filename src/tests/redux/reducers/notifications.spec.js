import notificationsReducer from "../../../redux/reducers/notifications";
import { SET_NOTIFICATIONS, REMOVE_NOTIFICATION } from "../../../redux/actions/types";

const notification = (articleId) => ({ articleId });

test('Should set notifications', () => {
  const state = notificationsReducer(undefined, {
    type: SET_NOTIFICATIONS,
    payload: [notification(3)]
  });

  expect(state).toEqual([notification(3)]);
});

test('Should remove notifications', () => {
  const state = notificationsReducer([
    notification(1), notification(2)
  ], {
    type: REMOVE_NOTIFICATION,
    payload: 1
  });

  expect(state).toEqual([{ articleId: 1, read: true }, { articleId: 2 }]);
});

test('Should return default state', () => {
  const state = notificationsReducer(undefined, {
    type: '@@INIT',
  });

  expect(state).toEqual([]);
});
