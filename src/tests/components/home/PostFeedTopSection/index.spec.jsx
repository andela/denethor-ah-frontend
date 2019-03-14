import React from 'react';
import { shallow } from 'enzyme';
import articles from '../../../mock-data/articles';
import categories from '../../../mock-data/categories';
import { PostFeedTopSection } from '../../../../components/feed/post-feed-top-section';

test('Should render post-feed-top-section with stats correctly', () => {
  const props = {
    articles,
    categories
  };

  const wrapper = shallow(
    <PostFeedTopSection {...props} />
  );
  
  expect(wrapper).toMatchSnapshot();
});