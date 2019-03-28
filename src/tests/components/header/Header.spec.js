import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../../components/header/Header';
import SearchWidget from '../../../components/header/widgets/searchWidget/SearchWidget';
import Widgets from '../../../components/header/widgets';

require('dotenv').config;

jest.mock('../../../utils/socket.js')

test("it renders correctly as a static component", () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot();
});

test("SearchWidget is present in the Header Component", () => {
  const wrapper = shallow(<Header />)
  expect(wrapper.find(SearchWidget).length).toBe(2);
});

test("It should render correctly, when user is logged in", () => {
  const props = { isLoggedIn: true };
  const wrapper = shallow(<Header {...props} />)
  expect(wrapper.find(Widgets).length).toBe(1);
});