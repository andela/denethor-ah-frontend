import '@babel/polyfill';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addUser, removeUser } from '../../../redux/actions/users';
import signUp from '../../../utils/signUp';
import users from '../../mock-data/users';

const createMockStore = configureMockStore([thunk]);
jest.mock('axios');

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

it('Should dispatch correct error when 409 error is thrown', async () => {
  const signUpDetails = { 
    firstname: 'Lorem',
    lastname: 'Ipsum',
    username: 'loremIpsum',
    email: 'lorem@ipsum.com',
    password: 'loremipsum1'
  };
  const response = { response: { status: 409 } };

  axios.post.mockRejectedValue(response);

  const { message } = await signUp(signUpDetails);

  expect(message).toBe('User with this email already exist');
});

it('Should dispatch correct error when 422 error is thrown', async () => {
  const signUpDetails = {
    firstname: 'Lorem',
    lastname: 'Ipsum',
    username: 'loremIpsum',
    email: 'lorem@ipsum.com',
    password: 'loremipsum1'
  };
  const response = { response: { status: 422 } };

  axios.post.mockRejectedValue(response);

  const { message } = await signUp(signUpDetails);

  expect(message).toBe('Username is invalid');
});

test('Should dispatch correct error when 500 error is thrown', async () => {
  const signUpDetails = {
    firstname: 'Lorem',
    lastname: 'Ipsum',
    username: 'loremIpsum',
    email: 'lorem@ipsum.com',
    password: 'loremipsum1'
  };
  const response = { response: { status: 500 } };

  axios.post.mockRejectedValue(response);

  const { message } = await signUp(signUpDetails);

  expect(message).toBe('Internal server error occured');
});
