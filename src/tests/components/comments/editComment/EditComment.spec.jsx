import React from 'react';
import { shallow } from 'enzyme';
import { EditComment } from '../../../../components/comments/editComment/EditComment';

let wrapper;

it('Should render static component', () => {
  const toggleMode = jest.fn();
  const comment = {
    commentHistories: []
  };
  const props = {
    toggleMode, comment, isAuthor: true, hasHistory: true
  }
  wrapper = shallow(<EditComment {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('Should call handle functions onclick', () => {
  
  wrapper.find('FontAwesomeIcon').simulate('click');
  expect(wrapper.state('showModal')).toBe(true);
});
