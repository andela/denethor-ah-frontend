import React from 'react';
import { shallow } from 'enzyme';
import NoArticlesFound from '../../../components/paginator/NoArticlesFound';

test('Should render static component', () => {
  const wrapper = shallow(<NoArticlesFound />);
  expect(wrapper).toMatchSnapshot();
});
