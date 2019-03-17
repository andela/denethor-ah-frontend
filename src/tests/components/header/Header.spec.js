import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/header';

test("it renders correctly as a static component", () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot();
});
