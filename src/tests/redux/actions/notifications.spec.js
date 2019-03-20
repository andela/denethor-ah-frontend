import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { removeNotifications } from '../../../redux/actions/notifications';
import { REMOVE_NOTIFICATION } from '../../../redux/actions/types';

jest.mock('../../../utils/socket.js');
const createMockStore = configureMockStore([thunk]);

test('Should remove notifications', () => {
  const store = createMockStore([]);

  store.dispatch(removeNotifications(2));

  const [ action ] = store.getActions();

  expect(action).toEqual({
    payload: 2,
    type: REMOVE_NOTIFICATION,
  })
});
