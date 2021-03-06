import '@babel/polyfill';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login } from '../../../redux/actions/auth';
import { SET_LOGIN_STATUS } from '../../../redux/actions/types';

const createMockStore = configureMockStore([thunk]);
jest.mock('axios');
jest.mock('../../../utils/socket.js');

beforeEach(() => {
  localStorage.clear();
})


test('Should log in user with correct details', async () => {
  const store = createMockStore({});
  const loginDetails = {
    email: 'loremipsum@gmail.com',
    password: 'ldsdjkgjgldkjd'
  };
  
  const token = ';lkjhlhghjvkkbl';

  const response = {
    data: {
      data: {
        token
      }
    }
  };

  axios.post.mockResolvedValue(response);
  
  await store.dispatch(login(loginDetails));

  const [action] = store.getActions();

  expect(action).toEqual({
    payload: true,
    type: SET_LOGIN_STATUS
  });

  expect(localStorage.setItem).toHaveBeenLastCalledWith('token', token);
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

test('Should dispatch invalid input error from the server', async () => {
  const store = createMockStore({});
  const loginDetails = { email: 'lorem@ipsum.com' };

  const response = { response: { status: 422 }};

  axios.post.mockRejectedValue(response);
  
  const error = await store.dispatch(login(loginDetails));

  expect(error).toBe('Please provide the correct email and password');
});

test('Should dispatch error for on un-verified user', async () => {
  const store = createMockStore({});
  const loginDetails = { email: 'lorem@ipsum.com' };

  const response = { response: { status: 403 }};

  axios.post.mockRejectedValue(response);
  
  const error = await store.dispatch(login(loginDetails));

  expect(error).toBe('Please verify your email and try again');
});
