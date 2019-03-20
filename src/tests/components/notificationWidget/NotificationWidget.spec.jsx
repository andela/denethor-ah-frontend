import React from 'react';
import { shallow } from 'enzyme';
import { NotificationWidget } from '../../../components/notificationWidget/NotificationWidget';
import notifications from './mock-notifications';
import uuid from 'uuid/v1';

jest.mock('../../../utils/socket');
jest.mock('uuid/v1');

test('Should render static component', () => {
  uuid.mockReturnValue(expect.any(String));

  const props = {
    notifications,
    id: 'id',
    history: {
      location: {
        pathname: '/'
      }
    }
  }
  const wrapper = shallow(<NotificationWidget { ...props } />);

  expect(wrapper).toMatchSnapshot();
});

test('Should show notification preview pan on click of icon', () => {
  const props = {
    history: {
      location: {
        pathname: '/'
      }
    },
    notifications,
    id: 'id'
  };

  const wrapper = shallow(<NotificationWidget { ...props } />);

  wrapper.setState({ showPreview: false });

  wrapper.find('button').at(0).simulate('click');

  expect(wrapper.state('showPreview')).toBe(true);
});


test('Should show notification badge only on existence of notifications', () => {
  const props = {
    history: {
      location: {
        pathname: '/'
      }
    },
    notifications,
    id: 'id'
  };

  const wrapper = shallow(<NotificationWidget { ...props } />);

  wrapper.setState({ showBadge: true });

  wrapper.setProps({
    history: {
      location: {
        pathname: '/dashboard'
      }
    },
    notifications: []
  });

  expect(wrapper.state('showBadge')).toBe(false);
});
