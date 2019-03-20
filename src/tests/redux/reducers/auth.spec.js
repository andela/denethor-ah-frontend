import authReducer from '../../../redux/reducers/auth';
import { SET_LOGIN_STATUS } from '../../../redux/actions/types';

it('Should return default state', () => {
  const state = authReducer(undefined, {
    type: '@@INIT'
  });

  expect(state).toEqual({
    isLoggedIn: false
  });
});

it('Should save user and set isLogged in to true on successful login', () => {
  const state = authReducer(undefined, {
    payload: true,
    type: SET_LOGIN_STATUS
  });

  expect(state).toEqual({
    isLoggedIn: true
  });
});
