import usersReducer from '../../../redux/reducers/users';
import users from '../../mock-data/users';
import {ADD_USER, REMOVE_USER} from '../../../redux/actions/types';

it('Should return default state when initialized', () => {
  const state = usersReducer(undefined, {
    type: '@@INIT'
  });
  expect(state[0].id).toBe('top1');
  expect(state[1].id).toBe('top2');
});

it('Should add users to store', () => {
  const state = usersReducer(users, {
    type: ADD_USER,
    user: users[0]
  });
  expect(state).toEqual([...users, users[0]]);
});

it('Should remove users from store', () => {
  const initialLength = users.length;
  const state = usersReducer(users, {
    type: REMOVE_USER,
    id: users[0].id
  });
  expect(state.length).toEqual(initialLength - 1);
});
