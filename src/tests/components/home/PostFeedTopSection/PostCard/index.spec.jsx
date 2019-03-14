import React from 'react';
import { shallow } from 'enzyme';
import articles from '../../../../mock-data/articles';
import categories from '../../../../mock-data/categories';
import { PostCard } from '../../../../../components/feed/post-card';

test('Should render postcard', () => {
  const props = {
    size: 'small',
    article: articles[0],
    categories
  };

  const wrapper = shallow(
    <PostCard {...props} />
  );

  expect(wrapper.find('span').length).toBe(1);
  
  expect(wrapper).toMatchSnapshot();
});