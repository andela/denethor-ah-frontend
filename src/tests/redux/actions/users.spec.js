import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addUser, removeUser } from '../../../redux/actions/users';
import users from '../../mock-data/users';

const createMockStore = configureMockStore([thunk]);

it('Should add users to store', () => {
  const store = createMockStore({});
  store.dispatch(addUser(users[0]));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'ADD_USER',
    user: users[0]
  });
});

it('Should remove users from store', () => {
  const store = createMockStore({});
  store.dispatch(removeUser(users[0].id));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'REMOVE_USER',
    id: users[0].id
  });
});
