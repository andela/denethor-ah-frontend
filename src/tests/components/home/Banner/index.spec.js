import React from 'react';
import { shallow } from 'enzyme';
import Banner from '../../../../components/home/Banner';

test('Should render banner with stats correctly', () => {
  const wrapper = shallow(<Banner side={'Stats'}/>);
  expect(wrapper).toMatchSnapshot();
});
