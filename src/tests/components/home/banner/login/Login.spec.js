import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../../../components/home/banner/login/Login';

test('Should render login form', () => {
  const wrapper = shallow(<Login />);

  expect(wrapper).toMatchSnapshot();
});

it('Should set email state on input change', () => {
  const value = 'foobar';
  const wrapper = shallow(<Login />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('email')).toBe(value);
});

it('Should validate email on input blur', () => {
  const value = 'foobar';
  const wrapper = shallow(<Login />);
  wrapper.find('input').at(0).simulate('blur');
  expect(wrapper.state('emailErrorMessage')).toBe('Please enter your email address.');
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  wrapper.find('input').at(0).simulate('blur');
  expect(wrapper.state('emailErrorMessage')).toBe('Invalid email address, please crosscheck.');
  wrapper.find('input').at(0).simulate('change', {
    target: { value: 'lorem@ipsum.dolor' }
  });

  expect(wrapper.state('emailErrorMessage')).toBe('');
});

it('Should set password state on input change', () => {
  const value = 'foobar';
  const wrapper = shallow(<Login />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('password')).toBe(value);
});

it('Should validate password state on input blur', () => {
  const wrapper = shallow(<Login />);
  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('passwordErrorMessage')).toBe('Please enter your password.');

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'jgjgnf' }
  });
  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('passwordErrorMessage')).toBe('Password must be 8 or more characters.');

  wrapper.find('input').at(1).simulate('change', {
    target: { value: '$%^&*(*(*&^&*(' }
  });
  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('passwordErrorMessage')).toBe('Use numbers and letters for password.');

  wrapper.find('input').at(1).simulate('change', {
    target: { value: 'hgjvbkvgcfjvk7' }
  });
  wrapper.find('input').at(1).simulate('blur');
  expect(wrapper.state('passwordErrorMessage')).toBe('');
});

it('Should render error for form submission without email', () => {
  const wrapper = shallow(<Login />);
  wrapper.find('button').simulate('click', { preventDefault: () => {} });
  expect(wrapper.state('emailErrorMessage')).toBe('Please enter your email address.');
});

it('Should render error for form submission without password', () => {
  const value = 'foobar@gmail.com';
  const wrapper = shallow(<Login />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  wrapper.find('button').simulate('click', { preventDefault: () => {} });
  expect(wrapper.state('emailErrorMessage')).toBe('');
  expect(wrapper.state('passwordErrorMessage')).toBe('Please enter your password.');
});

it('Should call handleLogin for valid form submission', () => {
  const value = 'foobar@gmail.com';
  const handleLogin = jest.fn();
  const wrapper = shallow(<Login handleLogin={handleLogin} />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  wrapper.find('button').simulate('click', { preventDefault: () => {} });
  expect(wrapper.state('emailErrorMessage')).toBe('');
  expect(wrapper.state('passwordErrorMessage')).toBe('');
  expect(handleLogin).toHaveBeenCalled();
});
