import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { getOwnProfile, updateProfile, uploadProfilePicture } from '../../../redux/actions/profile';
import { UPDATE_PROFILE } from '../../../redux/actions/types';
import profile from '../../mock-data/profile';
import axios from '../../../utils/axiosConfig';

const createMockStore = configureMockStore([thunk]);
const api = process.env.API_ROOT_URL;
const mock = new MockAdapter(axios);
jest.mock('../../../utils/socket.js');
jest.mock('../../../utils/dataURLtoFile.js');

test('Should get profile and rating', async () => {
  const store = createMockStore({});
  const rate = {
    "status": "success",
    "data": [{
      rating: 4,
    }, {
      rating: 4
    }]
  };



  mock.onGet(`${api}/users/id/profile`)
    .reply(200, profile);

  profile.data.publishedArticles.forEach(({ id }) => mock.onGet(`${api}/articles/${id}/ratings`).reply(200, rate));

  await store.dispatch(getOwnProfile('id'));

  expect(store.getActions()[1]).toEqual({
    type: UPDATE_PROFILE,
    payload: {
      userAverageRating: {
        averageRating: 4,
        ratingCount: 6,
        totalArticlesWithRating: 3,
        totalRating: 12,
      }
    }
  });
});

test('Should throw correct errors on failure to get profile', async () => {
  const store = createMockStore({});

  mock.onGet(`${api}/users/id/profile`)
    .reply(404);

  let error = await store.dispatch(getOwnProfile('id'));

  expect(error).toBe('Not found.');

  mock.onGet(`${api}/users/id/profile`)
    .reply(500);

  error = await store.dispatch(getOwnProfile('id'));

  expect(error).toBe('Server error.');

  mock.onGet(`${api}/users/id/profile`)
    .reply(401);

  error = await store.dispatch(getOwnProfile('id'));

  expect(error).toBe('Unknown error.');
});


test('Should update profile', async () => {
  const store = createMockStore({});

  mock.onPatch(`${api}/users/id/profile`)
    .reply(200, profile);

  await store.dispatch(updateProfile('id', { firstname: 'Omoefe' }));

  expect(store.getActions()[0]).toEqual({
    type: UPDATE_PROFILE,
    payload: {
      firstname: 'Omoefe'
    }
  });
})

test('Should throw correct errors on failure to update profile', async () => {
  const store = createMockStore({});

  mock.onPatch(`${api}/users/id/profile`)
    .reply(404);

  let error = await store.dispatch(updateProfile('id'));

  expect(error).toBe('Not found.');

  mock.onPatch(`${api}/users/id/profile`)
    .reply(500);

  error = await store.dispatch(updateProfile('id'));

  expect(error).toBe('Server error.');

  mock.onPatch(`${api}/users/id/profile`)
    .reply(401);

  error = await store.dispatch(updateProfile('id'));

  expect(error).toBe('Unknown error.');
});

test('Should update profile picture', async () => {
  const store = createMockStore({});

  mock.onPost(`${api}/users/id/profile/upload`)
    .reply(200, profile);

  await store.dispatch(uploadProfilePicture('id', { firstname: 'Omoefe' }));

  expect(store.getActions()[0]).toEqual({
    type: UPDATE_PROFILE,
    payload: {
      imageUrl: profile.data.imageUrl
    }
  });
});

test('Should throw correct errors on failure to update profile picture', async () => {
  const store = createMockStore({});

  mock.onPost(`${api}/users/id/profile/upload`)
    .reply(404);

  let error = await store.dispatch(uploadProfilePicture('id'));

  expect(error).toBe('Not found.');

  mock.onPost(`${api}/users/id/profile/upload`)
    .reply(500);

  error = await store.dispatch(uploadProfilePicture('id'));

  expect(error).toBe('Server error.');

  mock.onPost(`${api}/users/id/profile/upload`)
    .reply(401);

  error = await store.dispatch(uploadProfilePicture('id'));

  expect(error).toBe('Unknown error.');
});
