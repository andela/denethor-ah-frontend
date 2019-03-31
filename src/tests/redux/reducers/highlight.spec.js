import '@babel/polyfill';
import highlightReducers from '../../../redux/reducers/highlights';
import { GET_HIGHLIGHTS, CLEAR_HIGHLIGHTS, ADD_HIGHLIGHT } from '../../../redux/actions/types';
import highlights from '../../mock-data/highlights';

describe('Test for Highlight Reducers', () => {
  it('Should return default state when initialized', () => {
    const state = highlightReducers(undefined, {
      type: '@@INIT'
    });
    expect(state).toEqual([]);
  });

  it('Should get Highlights from store', () => {
    const state = highlightReducers(highlights, {
      type: GET_HIGHLIGHTS,
      payload: highlights
    });
    expect(state.length).toEqual(highlights.length);
  });

  it('Should add Highlights from store', () => {
    const highlight = {
      highlight: 'sample highlight',
      comment: 'samole comment'
    }
    const state = highlightReducers(highlights, {
      type: ADD_HIGHLIGHT,
      payload: highlight
    });
    expect(state.length).toEqual([...highlights, highlight].length);
  });

  it('Should clear Highlights from store', () => {
    const state = highlightReducers(highlights, {
      type: CLEAR_HIGHLIGHTS,
    });
    expect(state.length).toEqual([].length);
  });
});
