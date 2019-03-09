import '@babel/polyfill';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login } from '../../../redux/actions/auth';
import { LOGIN_REQUEST_SUCCESS } from '../../../redux/actions/types';

const createMockStore = configureMockStore([thunk]);
jest.mock('axios');

beforeEach(() => {
  localStorage.clear();
})


test('Should log in user with correct details', async () => {
  const store = createMockStore({});
  const loginDetails = {
    email: 'loremipsum@gmail.com',
    password: 'ldsdjkgjgldkjd'
  };
  
  const user = { id: '1123' }

  const response = {
    data: {
      data: user
    }
  };

  axios.post.mockResolvedValue(response);
  
  await store.dispatch(login(loginDetails));

  const [action] = store.getActions();

  expect(action).toEqual({
    type: LOGIN_REQUEST_SUCCESS,
  });

  expect(localStorage.setItem).toHaveBeenLastCalledWith('user', JSON.stringify(user));
});


test('Should dispatch correct error when 404 error is thrown', async () => {
  const store = createMockStore({});
  const loginDetails = { email: 'lorem@ipsum.com' };

  const response = { response: { status: 401 }};

  axios.post.mockRejectedValue(response);
  
  const error = await store.dispatch(login(loginDetails));

  expect(error).toBe('Incorrect username or password.');
});


test('Should dispatch correct error when 500 error is thrown', async () => {
  const store = createMockStore({});
  const loginDetails = { email: 'lorem@ipsum.com' };

  const response = { response: { status: 500 }};

  axios.post.mockRejectedValue(response);
  
  const error = await store.dispatch(login(loginDetails));

  expect(error).toBe('Server error.');
});

test('Should dispatch correct error when unknown error is thrown', async () => {
  const store = createMockStore({});
  const loginDetails = { email: 'lorem@ipsum.com' };

  const response = { response: { status: 422 }};

  axios.post.mockRejectedValue(response);
  
  const error = await store.dispatch(login(loginDetails));

  expect(error).toBe('Unknown error.');
});
