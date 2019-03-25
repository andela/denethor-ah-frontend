import React from 'react';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import { ResetPassword, mapDispatchToProps } from '../../../components/resetPassword/ResetPassword';
import axios from '../../../utils/axiosConfig';
import { login } from '../../../redux/actions/auth';

jest.mock('../../../utils/socket.js');


jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/auth');

let wrapper;
const handleLogin = jest.fn();
let history = { push: jest.fn() };

beforeAll(() => {
  
  const props = {
    handleLogin,
    isLoggedIn: false
  };

  wrapper = shallow(<ResetPassword  {...props} history={history} />);
})

test('Should render ResetPassword correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should set state on password change', () => {
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'm' }
  });

  expect(wrapper.state('password')).toBe('m');

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  expect(wrapper.state('confirmPassword')).toBe('qwertyuiop');
});

test('Should verify on password blur', () => {
  wrapper.find('input').at(0).simulate('blur');

  expect(wrapper.state('passwordErrorMessage')).toBe('Password must be 8 or more characters.');

  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'monkey&*&*' }
  });

  wrapper.find('input').at(0).simulate('blur');

  expect(wrapper.state('passwordErrorMessage')).toBe('Use numbers and letters for password.');

  wrapper.find('input').at(0).simulate('change', {
    target: { value: '' }
  });

  wrapper.find('input').at(0).simulate('blur');

  expect(wrapper.state('passwordErrorMessage')).toBe('Please enter your password.');

  wrapper.find('input').at(1).simulate('blur');

  expect(wrapper.state('confirmPasswordErrorMessage')).toBe('Passwords do not match.');
});

test('Should handle submit event', async () => {
  window.history.pushState({}, 'Test Title', '/test.html#token=true');

  const handleLogin = jest.fn();
  const push = jest.fn();  
  const props = {
    history: { push },
    handleLogin,
    isLoggedIn: false
  };

  const wrapper = shallow(<ResetPassword  {...props} handleLogin={handleLogin} />);
  expect(wrapper.state('token')).toBe('true');

  const resetPasswordResponse = {
    data: {
      data: {
        email: 'omoefeisgood@gmail.com'
      }
    }
  };

  const resetPasswordResponseFake = {
    data: {
      data: {
        email: 'omoefeisgoodgmail.com'
      }
    }
  };

  const loginResponse = {
    data: {
      data: {
        token: 'jfjfjfjfjk'
      }
    }
  };

  const tick = () => {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    })
  }

  axios.patch.mockResolvedValue(resetPasswordResponse);
  axios.post.mockResolvedValue(loginResponse);


  const preventDefault = jest.fn();
  wrapper.find('button').simulate('click', { preventDefault });

  expect(preventDefault).toHaveBeenCalled();
  expect(wrapper.state('passwordErrorMessage')).toBe('Please enter your password.');

  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  wrapper.find('input').at(0).simulate('blur');
  wrapper.find('input').at(1).simulate('blur');

  wrapper.find('button').simulate('click', { preventDefault });
  await tick();

  expect(handleLogin).toHaveBeenCalled();
  expect(push).toHaveBeenCalledWith('/dashboard');

  axios.patch.mockResolvedValue(resetPasswordResponseFake);
  wrapper.find('button').simulate('click', { preventDefault });
  await tick();
  expect(toast.error).toHaveBeenCalled();
});

test('mapDispatchToProps returns correct props', () => {
  const dispatch = jest.fn();
  mapDispatchToProps(dispatch).handleLogin('omo');
  expect(login).toHaveBeenCalledWith('omo');
});
