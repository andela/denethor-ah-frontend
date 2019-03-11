import React from 'react';
import { mount } from 'enzyme';
import { SingleArticleView } from '../../../components/ArticlePage';
import articles from '../../mock-data/articles';

describe('Test for the single article component', () => {
	const props = {
		fetchArticle: jest.fn(),
		match: {
			params: {
				articleId: articles[0].id
			}
		},
		articles
	};

	it('should render single article view page', () => {
		const wrapper = mount( <SingleArticleView {...props} /> );
		expect(wrapper.length).toBe(1);
		expect(wrapper.find('.article-body').length).toBe(1);
		expect(wrapper.find('.banner-content-title').length).toBe(1);
		expect(wrapper.find('.user-profile-picture').length).toBe(1);
		expect(wrapper.find('.article-header-username').length).toBe(1);
		expect(wrapper.find('.article-body').length).toBe(1);
	});
});