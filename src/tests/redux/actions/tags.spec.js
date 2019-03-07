import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addTag, removeTag} from '../../../redux/actions/tags';
import tags from '../../mock-data/tags';

const createMockStore = configureMockStore([thunk]);

it('Should add tags to store', () => {
  const store = createMockStore({});
  store.dispatch(addTag(tags[0]));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'ADD_TAG',
    tag: tags[0]
  });
});

it('Should remove tags from store', () => {
  const store = createMockStore({});
  store.dispatch(removeTag(tags[0]));
  const [action] = store.getActions();
  expect(action).toEqual({
    type: 'REMOVE_TAG',
    tag: tags[0]
  });
});
