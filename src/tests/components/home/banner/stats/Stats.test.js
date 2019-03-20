import React from 'react';
import { shallow } from 'enzyme';
import Stats from '../../../../../components/home/banner/stats/Stats';
import users from '../../../../mock-data/users'

it('Should render stats component correctly', () => {
  const props = {
    writers: 1000, readers: 566, topAuthors: [users[0], users[1]]
  }
  const wrapper = shallow(<Stats {...props}/>);
  expect(wrapper).toMatchSnapshot();

});