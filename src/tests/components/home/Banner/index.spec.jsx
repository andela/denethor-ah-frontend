import React from 'react';
import { shallow } from 'enzyme';
import Banner from '../../../../components/home/Banner';

test('Should render banner with stats correctly', () => {
  const handleSignup = jest.fn();
  const wrapper = shallow(<Banner side={'Stats'} handleSignup={handleSignup}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should call signup function on button click', () => {
  const handleSignup = jest.fn();
  const wrapper = shallow(<Banner side={'Stats'} handleSignup={handleSignup}/>);
  wrapper.find('button').simulate('click');
  expect(handleSignup).toHaveBeenCalled();
});

test('Should render banner with login correctly', () => {
  const handleSignup = jest.fn();
  const wrapper = shallow(<Banner side={'Login'} handleSignup={handleSignup}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render banner with signup correctly', () => {
  const handleSignup = jest.fn();
  const wrapper = shallow(<Banner side={'Signup'} handleSignup={handleSignup}/>);
  expect(wrapper).toMatchSnapshot();
});
