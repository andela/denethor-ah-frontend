import React from 'react';
import { shallow } from 'enzyme';

import { SearchWidget } from '../../../components/header/widgets/searchWidget/SearchWidget';
import SearchForm from '../../../components/searchForm/SearchForm';

test('Should render Search Widget Component', () => {
  const props = { isLoggedIn: true };
  const wrapper = shallow(<SearchWidget {...props} />);

  wrapper.setState({ display: true });
  expect(wrapper).toMatchSnapshot();
});

test('Should render Search Widget Component, with collapsed form', () => {
  const wrapper = shallow(<SearchWidget />);

  expect(wrapper.find('button').length).toBe(1);
  expect(wrapper.find(SearchForm).length).toBe(1);
  expect(wrapper.state('display')).toEqual(false);
});

test('Should call handleDisplay function', () => {
  const props = { isLoggedIn: true };

  const wrapper = shallow(<SearchWidget {...props} />);

  expect(wrapper.state('display')).toBe(false);
  wrapper.find('button').at(0).simulate('click');
  expect(wrapper.state('display')).toBe(true);
});