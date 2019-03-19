import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import { UnsubscribeNotification } from '../../../components/notifications/UnsubscribeNotification';


jest.mock('axios');

describe('Test for the UnsubscibeNotifications component', () => {
    const props = {
    history: { push: jest.fn() },
    match:{
        params:{id:'e787f5cb-ea55-4f32-8b99-4a9f9f257fe3'}
    },
}

beforeEach(() => {
    process.env.API_ROOT_URL = 'whatever.com/api';
})

it('should unsubscribe an existing user from receiving notifications', async () => {
  const promise = Promise.resolve({ data: { message: "Successfully unsubscribed from email list" } });
  axios.patch.mockImplementationOnce(() => promise);
  mount(<UnsubscribeNotification {...props} />);
  return promise.then(() => {
    expect(props.history.push).toHaveBeenCalled();
  })
});
it('should return error if userId is invalid', async () => {
  const promise = jest.fn(() => Promise.reject({}));
  axios.patch.mockImplementationOnce(() => promise);
  mount(<UnsubscribeNotification {...props} />);
    expect(props.history.push).toHaveBeenCalled();
});
});