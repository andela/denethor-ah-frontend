import React from 'react';
import { mount } from 'enzyme';
import { CommentEntries, CreateComment, Comment }  from '../../../components/comments';
import { comments, commentEntry, count }  from '../../mock-data/comments';

const allCommentsImpressions = [];

describe('Test for the single comment component', () => {
	const props = {
		articleId: comments[0].articleId,
		addComment: jest.fn(),
		allCommentsImpressions
  };
  const handleOnClick = jest.fn();

	it('should render the Comment Component', () => {
    const wrapper = mount(<Comment id='string' handleOnClick={handleOnClick} /> );
		expect(wrapper.length).toBe(1);
		expect(wrapper.find('.comment-create-field').length).toBe(1);
		expect(wrapper.find('div').length).toBe(1);
		expect(wrapper.find('textarea').length).toBe(1);
		expect(wrapper.find('button').length).toBe(1);
		expect(wrapper).toMatchSnapshot();
	});

	it('should call toast error when server error occurs', () => {
		const props = {
			articleId: comments[0].articleId,
			addComment: jest.fn()
		};
		const wrapper = mount( <CreateComment {...props} /> );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Comment).length).toBe(1);
	});


	it('should show a toast error when user is not logged in', () => {
		const addComment = jest.fn(() => Promise.reject({ response: {
			status: 401
    }}));
		const props = {
			articleId: comments[0].articleId,
			addComment
		};
    const wrapper = mount( <CreateComment {...props} /> );
    expect(wrapper).toMatchSnapshot();
  });
  
	it('should update state as user is typing', () => {
    const handleOnClick = jest.fn();
    const wrapper = mount(<Comment handleOnClick={handleOnClick} /> );
    wrapper.find('TextAreaInput').at(0).simulate('change', { target: { value: 'hi' } });
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.state('comment')).toEqual('hi');
    expect(handleOnClick).toHaveBeenCalled();
	});
});