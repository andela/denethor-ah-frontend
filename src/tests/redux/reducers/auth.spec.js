import authReducer from '../../../redux/reducers/auth';
import { LOGIN_REQUEST_SUCCESS } from '../../../redux/actions/types';

beforeEach(() => {
  localStorage.clear();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
});

it('Should return default state when initialized with no user in localstorage', () => {
  const state = authReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual({});
});

it('Should return default state when initialized with user in localstorage', () => {
  const token = 'kjvbljhghvg';
  localStorage.setItem('token', token);

  const state = authReducer(undefined, {
    type: '@@INIT'
  });

  expect(state).toEqual({
    isLoggedIn: true
  });
});

it('Should save user and set isLogged in to true on successful login', () => {
  const user = {
    token: 'gjhkblhuighjkvj',
    id: 'gjhvklh',
    email: 'lorem@ipsum.dolor'
  }

  const state = authReducer(undefined, {
    type: LOGIN_REQUEST_SUCCESS,
    user
  });

  expect(state).toEqual({
    isLoggedIn: true
  });
});
