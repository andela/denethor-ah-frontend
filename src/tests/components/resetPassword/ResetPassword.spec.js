import React from 'react';
import { shallow } from 'enzyme';
import ResetPassword from '../../../components/resetPassword';
import axios from '../../../utils/axiosConfig';


jest.mock('../../../utils/axiosConfig');
jest.mock('react-toastify');
jest.mock('../../../redux/actions/auth');

let resetPassword;
let wrapper;
const preventDefault = jest.fn();

beforeEach(() => {
  wrapper = shallow(<ResetPassword />);
})

test('Should render ResetPassword correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should set state on password change', () => {
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'm' }
  });

  expect(wrapper.state('oldPassword')).toBe('m');

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  expect(wrapper.state('newPassword')).toBe('qwertyuiop');
});

test('Should verify on password blur', () => {
  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'mon' }
  });
  wrapper.find('input').at(1).simulate('blur');

  expect(wrapper.state('newPasswordErrorMessage')).toBe('Password must be 8 or more characters.');

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'monkey&*&*' }
  });

  wrapper.find('input').at(1).simulate('blur');

  expect(wrapper.state('newPasswordErrorMessage')).toBe('Use numbers and letters for password.');

  wrapper.find('input').at(0).simulate('change', {
    target: { value: '' }
  });

  wrapper.find('input').at(0).simulate('blur');

  expect(wrapper.state('oldPasswordErrorMessage')).toBe('Please enter your Old password.');

  wrapper.find('input').at(1).simulate('change', {
    target: { value: '' }
  });

  wrapper.find('input').at(1).simulate('blur');

  expect(wrapper.state('newPasswordErrorMessage')).toBe('Please enter your New password.');

  wrapper.find('input').at(0).simulate('change', {
    target: { value : 'olubukola'}
  })

  wrapper.find('input').at(1).simulate('change', {
  target: { value: 'olubukola'}
  })

  wrapper.find('input').at(1).simulate('blur');

  expect(wrapper.state('newPasswordErrorMessage')).toBe('New password must be different.');
});

test('Should throw error if submit is clicked when old Password is not empty', async () => {

  wrapper.find('button[name="submit"]').simulate('click', { preventDefault });
  expect(preventDefault).toHaveBeenCalled();
  expect(wrapper.state('oldPasswordErrorMessage')).toBe('Please enter your Old password.');
});

test('Should throw error if submit is clicked when new Password is not empty', async () => {
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'qwertyuiop'}
  })

  wrapper.find('button[name="submit"]').simulate('click', { preventDefault });
  expect(preventDefault).toHaveBeenCalled();
  expect(wrapper.state('oldPassword')).toBe('qwertyuiop');
  expect(wrapper.state('newPasswordErrorMessage')).toBe('Please enter your New password.');
});

test('Should submit successfully if correct inputs is provided', async () => {

  const props = {
    resetPassword: jest.fn().mockImplementation(() => Promise.resolve({}))
  };

  wrapper = shallow(<ResetPassword  {...props} />);

  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'qwertyuiop' }
  });


  wrapper.find('button').simulate('click', { preventDefault });
  expect(props.resetPassword).toHaveBeenCalled();

});
test('Should throw error if inputs are invalid', async () => {

  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  wrapper.find('button').simulate('click', { preventDefault });

  resetPassword = jest.fn(() => Promise.reject({}));
  axios.patch.mockResolvedValue(resetPassword);
  wrapper.find('button').simulate('click', { preventDefault });
  
});

it('should show a toast error when user Old password does not exist', () => {
 const resetPassword = jest.fn().mockImplementation(() => Promise.reject({response:{
    status:403
  }}))
  const props = {
    resetPassword
  };

  wrapper = shallow(<ResetPassword  {...props} />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'qwertyuiop' }
  });

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'qwertyuiop' }
  });


  wrapper.find('button').simulate('click', { preventDefault });

});

it('should show a toast error when a validation error occurs', () => {
  const resetPassword = jest.fn().mockImplementation(() => Promise.reject({response:{
     status:422
   }}))
   const props = {
     resetPassword
   };
 
   wrapper = shallow(<ResetPassword  {...props} />);
   wrapper.find('input').at(0).simulate('change', {
     target: { value: 'qwertyuiop' }
   });
 
   wrapper.find('input').at(1).simulate('change', {
     target: { value: 'qwertyuiop' }
   });
 
   wrapper.find('button').simulate('click', { preventDefault });
 
 });