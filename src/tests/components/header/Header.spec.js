import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/header';

test("it renders correctly as a static component", () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot();
});

test("it calls loadStats function on click of logo", () => {
  const push = jest.fn();
  const history = { push };
  const handleLogin = jest.fn();
  const handleSignup = jest.fn();
  const loadStats = jest.fn();
  const props = { history, handleLogin, handleSignup, loadStats };
  const wrapper = shallow(<Header {...props}/>);
  wrapper.find('button').at(0).simulate('click');
  expect(push).toHaveBeenCalled();
});