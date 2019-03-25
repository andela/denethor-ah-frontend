import React from 'react';
import { shallow } from 'enzyme';
import { Paginator } from '../../../components/paginator/ServerPaginator';
import axios from '../../../utils/axiosConfig';

jest.mock('../../../utils/axiosConfig.js');

test('Should render static component', () => {
  axios.get.mockResolvedValue({ data: { data: { items: {}, count: 4 } } });
  const wrapper = shallow(<Paginator url='string' />);
  expect(wrapper).toMatchSnapshot();
});
