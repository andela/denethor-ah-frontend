import React from 'react';
import { shallow } from 'enzyme';
import { Paginator } from '../../../components/paginator/Paginator';
import articles from '../../mock-data/articles';

test('Should render static component', () => {
  const wrapper = shallow(<Paginator items={articles} />);
  expect(wrapper).toMatchSnapshot();
});
