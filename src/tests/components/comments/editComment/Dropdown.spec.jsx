import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../../../components/comments/editComment/Dropdown';

it('Should render static component', () => {
  const wrapper = shallow(<Dropdown isAuthor={true} hasHistory={true} />);
  expect(wrapper).toMatchSnapshot();
});

it('Should call handle functions onclick', () => {
  const toggleMode = jest.fn();
  const showHistory = jest.fn();
  const props = {
    toggleMode, showHistory, isAuthor: true, hasHistory: true
  }
  const wrapper = shallow(<Dropdown {...props} />);
  wrapper.find('button').at(0).simulate('click');
  expect(toggleMode).toHaveBeenLastCalledWith('edit');
  wrapper.find('button').at(1).simulate('click');
  wrapper.unmount();
  expect(showHistory).toHaveBeenLastCalledWith(true);
});
