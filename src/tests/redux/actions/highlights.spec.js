import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../utils/axiosConfig';
import { addHighlight, getHighlights } from '../../../redux/actions/highlight';
import { ADD_HIGHLIGHT, GET_HIGHLIGHTS, CLEAR_HIGHLIGHTS } from '../../../redux/actions/types';
import highlights from '../../mock-data/highlights';

const createMockStore = configureMockStore([thunk]);
const { API_ROOT_URL } = process.env;
const mock = new MockAdapter(axios);
const articleId = 'sample-articleId'

describe('Highlight actions', () => {
  it('Should add Highlights to articles', async () => {
    const store = createMockStore({ highlights: [] });
    const highlight = {
      highlight: 'sample highlight',
      comment: 'sample comment'
    };

    mock.onPost(`${API_ROOT_URL}/articles/${articleId}/highlights`).reply(200, {
      status: 'success',
      data: { highlight }
    })

    const expectedActions = [
      {
        type: ADD_HIGHLIGHT,
        payload: highlight
      },
    ];

    await store.dispatch(addHighlight(articleId, highlight));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should get Highlights for an articles', async () => {
    const store = createMockStore({ highlights });

    mock.onGet(`${API_ROOT_URL}/articles/${articleId}/highlights`).reply(200, {
      status: 'success',
      data: { highlights }
    })

    const expectedActions = [{ type: CLEAR_HIGHLIGHTS }];

    await store.dispatch(getHighlights(highlights));
    expect(store.getActions()).toEqual(expectedActions);
  });
})