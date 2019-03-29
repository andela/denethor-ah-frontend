import React from 'react';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import { Comment } from '../../../components/comments/CreateComment';

jest.mock('../../../utils/socket.js');

jest.mock('react-toastify');
let wrapper, addComment;

it('Should render static component', () => {
  addComment = jest.fn();
  const props = { addComment, dispatch: () => {} }
  wrapper = shallow(<Comment {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('Should call handle functions onclick', async () => {
  addComment.mockResolvedValue('');
  wrapper.find('Button').simulate('click', { preventDefault: () => {} });
  expect(toast.error).toHaveBeenLastCalledWith('You need to login to comment on this article');

  wrapper.setProps({ isLoggedIn: true });
  wrapper.find('Button').simulate('click', { preventDefault: () => {} });
  expect(addComment).toHaveBeenCalled();
});
