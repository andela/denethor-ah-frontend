import { shallow } from 'enzyme';
import React from 'react';
import { Signup } from '../../../../../components/home/banner/signup/Signup';

jest.mock('axios');

jest.mock('../../../../../utils/socket.js');

test('Should render Sign-up form', () => {
  const wrapper = shallow(<Signup />);

  expect(wrapper).toMatchSnapshot();
});


it('Should set firstname state on input change', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);
  wrapper.find('input').at(0).simulate('change', { target: { value } });
  expect(wrapper.state('firstname')).toBe(value);
});

it('Should validate firstname on input blur', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);

  wrapper.find('input').at(0).simulate('blur', { target: { value: '' } });
  expect(wrapper.state('firstnameError')).toBe('First name cannot be empty');
  wrapper.find('input').at(0).simulate('blur', { target: { value } });
  expect(wrapper.state('firstnameError')).toBe('');
});

it('Should set lastname state on input change', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);
  wrapper.find('input').at(1).simulate('change', { target: { value } });
  expect(wrapper.state('lastname')).toBe(value);
});

it('Should validate lastname on input blur', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);

  wrapper.find('input').at(1).simulate('blur', { target: { value: '' } });
  expect(wrapper.state('lastnameError')).toBe('Last name cannot be empty');
  wrapper.find('input').at(1).simulate('blur', { target: { value } });
  expect(wrapper.state('lastnameError')).toBe('');
});

it('Should set username state on input change', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);
  wrapper.find('input').at(2).simulate('change', { target: { value } });
  expect(wrapper.state('username')).toBe(value);
});

it('Should validate username on input blur', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);

  wrapper.find('input').at(2).simulate('blur', { target: { value: '' } });
  expect(wrapper.state('usernameError')).toBe('Username cannot be empty');
  wrapper.find('input').at(2).simulate('blur', { target: { value } });
  expect(wrapper.state('usernameError')).toBe('');
});

it('Should set email state on input change', () => {
  const value = 'foobar@foobar.com';
  const wrapper = shallow(<Signup />);

  wrapper.find('input').at(3).simulate('change', { target: { value } });
  expect(wrapper.state('email')).toBe(value);
});

it('Should validate email on input blur', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);

  wrapper.find('input').at(3).simulate('blur', { target: { value } });
  expect(wrapper.state('emailError')).toBe('Invalid email address, please crosscheck');
  wrapper.find('input').at(3).simulate('blur', { target: { value } });
  expect(wrapper.state('emailError')).toBe('Invalid email address, please crosscheck');
  wrapper.find('input').at(3).simulate('blur', { target: { value: 'foobar@foobar.com' } });
  expect(wrapper.state('emailError')).toBe('');
});

it('Should validate password state on input blur', () => {
  const value = 'foobar';
  const wrapper = shallow(<Signup />);

  wrapper.find('input').at(4).simulate('blur', { target: { value: '' } });
  expect(wrapper.state('passwordError')).toBe('Password must be alphanumeric with 8 or more characters');
  wrapper.find('input').at(4).simulate('blur', { target: { value } });
  expect(wrapper.state('passwordError')).toBe('Password must be alphanumeric with 8 or more characters');
  wrapper.find('input').at(4).simulate('blur', { target: { value: '$%^&*(*(*&^&*(' } });
  expect(wrapper.state('passwordError')).toBe('Password must be alphanumeric with 8 or more characters');
  wrapper.find('input').at(4).simulate('blur', { target: { value: 'hgjvbkvgcfjvk7' } });
  expect(wrapper.state('passwordError')).toBe('');
});

it('Should submit for for valid inputs', () => {
  const value = 'foobar1@gmail.com';
  const wrapper = shallow(<Signup />);
  wrapper.find('input').at(0).simulate('blur', { target: { value } });
  wrapper.find('input').at(1).simulate('blur', { target: { value } });
  wrapper.find('input').at(2).simulate('blur', { target: { value } });
  wrapper.find('input').at(3).simulate('blur', { target: { value } });
  wrapper.find('input').at(4).simulate('blur', { target: { value: 'foobarpass11' } });
  
  expect(wrapper.state('firstnameError')).toBe('');
  expect(wrapper.state('lastnameError')).toBe('');
  expect(wrapper.state('usernameError')).toBe('');
  expect(wrapper.state('emailError')).toBe('');
  expect(wrapper.state('passwordError')).toBe('');
  wrapper.find('form').simulate('submit');
});
