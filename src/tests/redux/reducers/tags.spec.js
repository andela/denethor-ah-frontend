import tagsReducer from '../../../redux/reducers/tags';
import tags from '../../mock-data/tags';
import actions from '../../../redux/actions/types';


it('Should return default state when initialized', () => {
  const state = tagsReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('Should add tags to store', () => {
  const state = tagsReducer(tags, {
    type: actions.ADD_TAG,
    tag: tags[0]
  });
  expect(state).toEqual([...tags, tags[0]]);
});

it('Should remove tags from store', () => {
  const initialLength = tags.length;
  const state = tagsReducer(tags, {
    type: actions.REMOVE_TAG,
    tag: tags[0]
  });
  expect(state.length).toEqual(initialLength - 1);
});
