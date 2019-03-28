import React from 'react';
import { mount } from 'enzyme';
import { Comment } from '../../../components/comments';
import { CreateHighlight } from '../../../components/highlight/CreateHighlight';
import HighlightEntries from '../../../components/highlight/HighlightEntries';

describe('Test for Highlights and Highlight Entries', () => {
  const highlights = [{
    comment: 'Blah Blah Blah',
    highlight: 'Blah Blah Blah'
  }]

  it('should render the comment entry section', () => {
    const wrapper = mount(<HighlightEntries highlights={highlights} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.highlight-entry').length).toBe(1);
  });

  it('should call toast error when server error occurs', () => {
    const props = {
      readerId: 'sample-user',
      articleId: 'sample-article',
      highlightText: 'sample highlight',
      addHighlight: jest.fn(),
      display: true,
      id: 'sample-id',
      isLoggedIn: true
    };
    const wrapper = mount(<CreateHighlight {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Comment).length).toBe(1);
  });

  it('should update state as user is typing', () => {
    const handleOnClick = jest.fn();
    const wrapper = mount(<Comment handleOnClick={handleOnClick} />);
    wrapper.find('TextAreaInput').at(0).simulate('change', { target: { value: 'hi' } });
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.state('comment')).toEqual('hi');
    expect(handleOnClick).toHaveBeenCalled();
  });
});