import React from 'react';
import uuid from 'uuid/v1';
import { shallow } from 'enzyme';
import { NotificationWidget } from '../../../components/header/widgets/notificationWidget/NotificationWidget';
import notifications from './mock-notifications';

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
