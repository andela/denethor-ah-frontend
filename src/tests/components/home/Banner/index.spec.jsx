import React from 'react';
import { mount } from 'enzyme';
import Banner from '../../../../components/home/Banner';

test('Should render banner with stats correctly', () => {
  const wrapper = mount(<Banner side={'Stats'}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render banner with login correctly', () => {
  const wrapper = mount(<Banner side={'Login'}/>);
  expect(wrapper).toMatchSnapshot();
});

test('Should render banner with signup correctly', () => {
  const wrapper = mount(<Banner side={'Signup'}/>);
  expect(wrapper).toMatchSnapshot();
});
