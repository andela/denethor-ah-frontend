import React from 'react';
import { mount } from 'enzyme';
import ArticlePage from '../../../components/ArticlePage';


describe('Test for the ArticlePage component', () => {
  it('should contain main elemens', () => {
    const wrapper = mount( < ArticlePage /> );
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.banner-section').length).toBe(1);
    expect(wrapper.find('.article-body').length).toBe(1);
    expect(wrapper.find('.section-comment-create').length).toBe(1);
  })
})