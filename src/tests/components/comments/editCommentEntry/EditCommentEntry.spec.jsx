import React from 'react';
import { shallow } from 'enzyme';
import { EditCommentEntry } from '../../../../components/comments/editCommentEntry/EditCommentEntry';

it('Should render static component', () => {
  const comment = {
    commentBody: 'this is comment body',
    id: 'the id'
  }
  const wrapper = shallow(<EditCommentEntry comment={comment} />);
  expect(wrapper).toMatchSnapshot();
});

it('Should call handle functions onclick', () => {
  const editComment = jest.fn();
  const toggleMode = jest.fn();
  const location = { pathname: '/bal' };
  const props = {
    toggleMode, editComment, location, comment: {
      commentBody: 'this is comment body',
      id: 'the id'
    }
  };

  const wrapper = shallow(<EditCommentEntry {...props} />);

  wrapper.find('Button').at(0).simulate('click');

  expect(editComment).toHaveBeenCalled();

  wrapper.find('Button').at(1).simulate('click');
  expect(toggleMode).toHaveBeenLastCalledWith('read');
});
