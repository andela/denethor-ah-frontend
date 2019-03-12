import React from 'react';
import { shallow } from 'enzyme';
import articles from '../../../mock-data/articles';
import categories from '../../../mock-data/categories';
import { PostStreamTopSection } from '../../../../components/home/PostFeedTopSection';

test('Should render post-feed-top-section with stats correctly', () => {
  const props = {
    fetchArticles: jest.fn(),
    articles,
    categories
  };

  const wrapper = shallow(
    <PostStreamTopSection {...props} />
  );
  
  expect(wrapper).toMatchSnapshot();
});