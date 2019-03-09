import commentsReducer from '../../../redux/reducers/comments';
import comments from '../../mock-data/comments';
import { ADD_COMMENT, REMOVE_COMMENT } from '../../../redux/actions/types';



it('Should return default state when initialized', () => {
  const state = commentsReducer(undefined, {
    type: '@@INIT'
  });
  expect(state).toEqual([]);
});

it('Should add comments to store', () => {
  const state = commentsReducer(comments, {
    type: ADD_COMMENT,
    comment: comments[0]
  });
  expect(state).toEqual([...comments, comments[0]]);
});

it('Should remove comments from store', () => {
  const initialLength = comments.length;
  const state = commentsReducer(comments, {
    type: REMOVE_COMMENT,
    id: comments[0].id
  });
  expect(state.length).toEqual(initialLength - 1);
});
