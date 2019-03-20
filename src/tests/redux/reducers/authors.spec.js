import '@babel/polyfill';
import authorReducer from '../../../redux/reducers/authors';
import { GET_AUTHORS } from '../../../redux/actions/types';
import users from '../../mock-data/users';

it('Should return default state when initialized', () => {
  const state = authorReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('Should get Filtered Articles from store', () => {
  const state = authorReducer(users, {
    type: GET_AUTHORS,
    payload: users
  });
  expect(state.length).toEqual(users.length);
});
