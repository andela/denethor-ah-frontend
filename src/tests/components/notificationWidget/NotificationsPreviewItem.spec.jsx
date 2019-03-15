import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Notification, mapDispatchToProps } from '../../../components/header/widgets/notificationWidget/Notification';
import notifications from './mock-notifications';
import { removeNotifications } from '../../../redux/actions/notifications';

jest.mock('../../../utils/socket');
jest.mock('../../../redux/actions/notifications');

test('Should render static component', () => {
  const props = {
    notification: { ...notifications[0], time: 12345 },
    removeNotifications: () => {}
  }
  const wrapper = shallow(<Notification { ...props } />);

  expect(wrapper).toMatchSnapshot();
});

test('Should map dispatch to props', () => {
  const dispatch = jest.fn();
  removeNotifications.mockReturnValue('notification removed');

  const { removeNotifications: stateRemoveNotifications } = mapDispatchToProps(dispatch);

  stateRemoveNotifications(3);

  expect(dispatch).toHaveBeenLastCalledWith('notification removed');
});


test('Should remvove article on click', () => {
  const removeNotifications = jest.fn();
  const props = {
    notification: { ...notifications[0], time: 12345 },
    removeNotifications,
  }
  const wrapper = mount(<BrowserRouter><Notification { ...props } /></BrowserRouter>);

  wrapper.find('a').simulate('click');

  expect(removeNotifications).toHaveBeenLastCalledWith(notifications[0].articleId);
});
