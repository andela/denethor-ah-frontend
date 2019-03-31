import axios from '../../../utils/axiosConfig';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { addTag, removeTag, getTags} from '../../../redux/actions/tags';
import tags from '../../mock-data/tags';
import { GET_TAGS } from '../../../redux/actions/types';

const createMockStore = configureMockStore([thunk]);
const { API_ROOT_URL } = process.env;
const mock = new MockAdapter(axios);

describe('Tags actions', () => {
  it('Should add tags to store', () => {
    const store = createMockStore({});
    store.dispatch(addTag(tags[0]));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'ADD_TAG',
      payload: tags[0]
    });
  });

  it('Should remove tags from store', () => {
    const store = createMockStore({});
    store.dispatch(removeTag(tags[0]));
    const [action] = store.getActions();
    expect(action).toEqual({
      type: 'REMOVE_TAG',
      payload: tags[0]
    });
  });

  it('Should get Tags from store', async () => {
    const store = createMockStore({ tags: [] });
    const tags = [
      {
        id: '21312-2133',
        tagText: 'fashion'
      }
    ]

    mock.onGet(`${API_ROOT_URL}/tags`).reply(200, {
      'status': 'success',
      'data': { 'tags': [...tags] }
    });
    const expectedActions = [
      {
        type: GET_TAGS,
        payload: [...tags],
      },
    ];
    await store.dispatch(getTags());
    expect(store.getActions()).toEqual(expectedActions);
  });
})
