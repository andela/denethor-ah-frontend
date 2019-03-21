import React from 'react';
import { mount } from 'enzyme';
import { SingleArticleView } from '../../../components/articles/ArticlePage';
import articles from '../../mock-data/articles';

describe('Test for the single article component', () => {
	const props = {
		fetchArticle: jest.fn(),
		addComment: jest.fn(),
		match: {
			params: {
				articleId: articles[0].id
			}
		},
		getArticleAvgRating: jest.fn(),
		rateArticle: jest.fn(),
		articles,
		comments: {
			comments: [{
				user: {
					firstname: 'Peace',
					lastname: 'Oyedeji'
				}

			}]
		}
	};

	it('should render single article view page', () => {
		const wrapper = mount(<SingleArticleView {...props} />);
		expect(wrapper.length).toBe(1);
		expect(wrapper.find('.article-body').length).toBe(1);
		expect(wrapper.find('.banner-content-title').length).toBe(1);
		expect(wrapper.find('.user-profile-picture').length).toBe(1);
		expect(wrapper.find('.article-header-username').length).toBe(1);
		expect(wrapper.find('.article-body').length).toBe(1);
	});

	it('should call toast success when starclickhandle is called', () => {
		const rateArticle = jest.fn(() => Promise.resolve({}));
		const props = {
			fetchArticle: jest.fn(),
			addcommment: jest.fn(),
			match: {
				params: {
					articleId: articles[0].id
				}
			},
			getArticleAvgRating: jest.fn(),
			rateArticle,
			articles,
			comments: {
				comments: [{
					user: {
						firstname: 'Peace',
						lastname: 'Oyedeji'
					}
	
				}]
			}
		};
		const wrapper = mount(<SingleArticleView {...props} />);
		wrapper.find('.rating-stars span').at(0).simulate('click', 5);
		expect(wrapper).toMatchSnapshot();
		expect(rateArticle).toHaveBeenCalled();
	});

	it('should call toast error when starclickhandle is called', () => {
		const rateArticle = jest.fn(() => Promise.reject({}));
		const props = {
			fetchArticle: jest.fn(),
			addComment: jest.fn(),
			match: {
				params: {
					articleId: articles[0].id
				}
			},
			getArticleAvgRating: jest.fn(),
			rateArticle,
			articles,
			comments: {
				comments: [{
					user: {
						firstname: 'Peace',
						lastname: 'Oyedeji'
					}
	
				}]
			}
		};
		const wrapper = mount(<SingleArticleView {...props} />);
		wrapper.find('.rating-stars span').at(0).simulate('click', 5);
		expect(wrapper).toMatchSnapshot();
		expect(rateArticle).toHaveBeenCalled();
	});

});
