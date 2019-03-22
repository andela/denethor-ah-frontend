import React from 'react';
import { mount } from 'enzyme';
import { CommentEntries, CreateComment}  from '../../../components/comments';
import { comments, commentEntry, count }  from '../../mock-data/comments';

const allCommentsImpressions = [];

describe('Test for the single comment component', () => {
	const props = {
		articleId: comments[0].articleId,
		addComment: jest.fn(),
		allCommentsImpressions
	};

	it('should render the comment section', () => {
		const wrapper = mount( <CreateComment {...props} /> );
		expect(wrapper.length).toBe(1);
		expect(wrapper.find('.comment-create-field').length).toBe(1);
		expect(wrapper.find('div').length).toBe(1);
		expect(wrapper.find('textarea').length).toBe(1);
		expect(wrapper.find('button').length).toBe(1);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render the comment entry section', () => {
		const wrapper = mount(<CommentEntries allCommentsImpressions={count} comments={commentEntry}/>);
		expect(wrapper.length).toBe(1);
		expect(wrapper.find('.comment-entry').length).toBe(1);
	});

	it('should call toast error when server error occurs', () => {
		const addComment = jest.fn(() => Promise.reject({}));
		const props = {
			articleId: comments[0].articleId,
			addComment
		};
		const wrapper = mount( <CreateComment {...props} /> );
		wrapper.find('Button').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(addComment).toHaveBeenCalled();
	});

	it('should show a toast when a validation error occurs', () => {
		const addComment = jest.fn(() => Promise.reject({ response: {
			status: 422
		}}));
		const props = {
			articleId: comments[0].articleId,
			addComment
		};
		const wrapper = mount( <CreateComment {...props} /> );
		wrapper.find('Button').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(addComment).toHaveBeenCalled();
	});

	it('should show a toast when user is not logged in', () => {
		const addComment = jest.fn(() => Promise.reject({ response: {
			status: 401
		}}));
		const props = {
			articleId: comments[0].articleId,
			addComment
		};
		const wrapper = mount( <CreateComment {...props} /> );
		wrapper.find('Button').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(addComment).toHaveBeenCalled();
	});
	it('should update state as user is typing', () => {
		const wrapper = mount( <CreateComment {...props} /> );
		wrapper.find('TextAreaInput').at(0).simulate('change', { target: { value: 'hi' } });
		expect(wrapper.state('commentBody')).toEqual('hi');
	});
});