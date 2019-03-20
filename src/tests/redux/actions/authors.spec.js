import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../utils/axiosConfig';
import getAuthors from '../../../redux/actions/authors';
import { GET_AUTHORS } from '../../../redux/actions/types';

const createMockStore = configureMockStore([thunk]);
const { API_ROOT_URL } = process.env;
const mock = new MockAdapter(axios);

describe('Author actions', () => {
  it('Should get Authors from store', async () => {
    const store = createMockStore({ authors: [] });
    const users = [
      {
        id: '123123-231213',
        username: 'Ibidapo'
      }
    ];

    mock.onGet(`${API_ROOT_URL}/users`).reply(200, {
      'status': 'success',
      'data': { 'users': [...users] }
    });
    const expectedActions = [
      {
        type: GET_AUTHORS,
        payload: [...users],
      },
    ];
    await store.dispatch(getAuthors());
    expect(store.getActions()).toEqual(expectedActions);
  });
});