import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/header/Header';

test("it renders correctly as a static component", () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot();
});

test("it calls login render function on click of login and signup buttons", () => {
  const history = { location: { pathname: '/' } };
  const handleLogin = jest.fn();
  const handleSignup = jest.fn();
  const props = { history, handleLogin, handleSignup };
  const wrapper = shallow(<Header {...props}/>);
  wrapper.find('button').at(0).simulate('click');
  expect(handleSignup).toHaveBeenCalled();

  wrapper.find('button').at(1).simulate('click');
  expect(handleLogin).toHaveBeenCalled();
});
