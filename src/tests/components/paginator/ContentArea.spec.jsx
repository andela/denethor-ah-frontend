import React from 'react';
import uuid from 'uuid/v1';
import { shallow } from 'enzyme';
import { ContentArea } from '../../../components/paginator/ContentArea';
import articles from '../../mock-data/articles';

jest.mock('uuid/v1');

test('Should render static component', () => {
  uuid.mockReturnValue('string');
  const wrapper = shallow(<ContentArea items={articles} />);
  expect(wrapper).toMatchSnapshot();
});
