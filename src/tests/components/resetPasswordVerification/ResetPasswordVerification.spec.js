import React from 'react';
import { shallow } from 'enzyme';
import { 
  ResetPasswordVerification
 } from '../../../components/resetPasswordVerification/ResetPasswordVerification';
import axios from '../../../utils/axiosConfig';

jest.mock('../../../utils/axiosConfig');

let wrapper;
let value;

beforeAll(() => {
  wrapper = shallow(<ResetPasswordVerification  />);
  value = 'foobar@bar.com';
})

test('Should render ResetPasswordVerification correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should set state on email change', () => {
  wrapper.find('input').at(0).simulate('change', { target: { value } });
  expect(wrapper.state('email')).toBe(value);
});

test('Should verify on email blur', () => {
  wrapper.find('input').at(0).simulate('blur', { target: { value: 'asdakldas' } });
  expect(wrapper.state('emailError')).toBe('Please enter a valid email address');

  wrapper.find('input').at(0).simulate('blur', { target: { value } });
  expect(wrapper.state('emailError')).toBe('');
});

test('Should handle submit event', async () => {
  const value = 'foobar@foo.com';
  const resetPasswordVerification = axios.post.mockImplementationOnce(() => Promise.resolve({
    email: value 
  }));
  const preventDefault = jest.fn();
  const wrapper = shallow(<ResetPasswordVerification />);

  wrapper.find('button').simulate('click', { preventDefault });
  expect(preventDefault).toHaveBeenCalled();

  wrapper.find('input').at(0).simulate('change', { target: { value } });
  wrapper.find('button').simulate('click', { preventDefault });
  expect(wrapper.state('email')).toBe(value);
  expect(preventDefault).toHaveBeenCalled();
  expect(resetPasswordVerification).toHaveBeenCalled();
});

test('Should throw an error when ', async () => {
  const value = 'foobar@foo.com';
  const resetPasswordVerification = axios.post.mockImplementationOnce(() => Promise.reject({
    response: { status: 404 }
  }));
  const preventDefault = jest.fn();
  const wrapper = shallow(<ResetPasswordVerification />);

  wrapper.find('button').simulate('click', { preventDefault });
  expect(preventDefault).toHaveBeenCalled();

  wrapper.find('input').at(0).simulate('change', { target: { value } });
  wrapper.find('button').simulate('click', { preventDefault });
  expect(wrapper.state('email')).toBe(value);
  expect(preventDefault).toHaveBeenCalled();
  expect(resetPasswordVerification).toHaveBeenCalled();
});
