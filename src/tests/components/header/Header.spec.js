import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/header/Header';

test("it renders correctly as a static component", () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot();
});

test("it calls login render function on click of login button", () => {
  const history = { location: { pathname: '/' } };
  const handleLogin = jest.fn();
  const handleSignup = jest.fn();
  const loadStats = jest.fn();
  const props = { history, handleLogin, handleSignup, loadStats };
  const wrapper = shallow(<Header {...props}/>);
  wrapper.find('button').at(1).simulate('click');
  expect(handleSignup).toHaveBeenCalled();
});

test("it calls login render function on click of signup button", () => {
  const history = { location: { pathname: '/' } };
  const handleLogin = jest.fn();
  const handleSignup = jest.fn();
  const loadStats = jest.fn();
  const props = { history, handleLogin, handleSignup, loadStats };
  const wrapper = shallow(<Header {...props}/>);
  wrapper.find('button').at(2).simulate('click');
  expect(handleLogin).toHaveBeenCalled();
});

test("it calls loadStats function on click of logo", () => {
  const history = { location: { pathname: '/' } };
  const handleLogin = jest.fn();
  const handleSignup = jest.fn();
  const loadStats = jest.fn();
  const props = { history, handleLogin, handleSignup, loadStats };
  const wrapper = shallow(<Header {...props}/>);
  wrapper.find('button').at(0).simulate('click');
  expect(loadStats).toHaveBeenCalled();
});
