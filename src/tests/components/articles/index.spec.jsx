import React from 'react';
import { mount, shallow} from 'enzyme';
import { SingleArticleView } from '../../../components/articles/ArticlePage';
import articles from '../../mock-data/articles';

jest.mock('../../../utils/socket');

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
		},
		impressions: {
			likes: [],
			dislikes: [],
			ratings: [],
			userBookmarks: [],
		},
		getArticleLikes: jest.fn(),
		getArticleDislikes: jest.fn()
	};
	it('should render single article view page', () => {
		const wrapper = shallow(<SingleArticleView {...props} />);
		expect(wrapper.length).toBe(1);
		expect(wrapper).toMatchSnapshot();
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
			},
			impressions: {
				likes: [],
				dislikes: [],
				ratings: [],
				userBookmarks: [],
			},
			getArticleLikes: jest.fn(),
			getArticleDislikes: jest.fn()
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
			},
			getArticleLikes: jest.fn(),
			getArticleDislikes: jest.fn(),
			impressions: {
				likes: [],
				dislikes: [],
				ratings: [],
				userBookmarks: [],
			},
		};
		const wrapper = mount(<SingleArticleView {...props} />);
		wrapper.find('.rating-stars span').at(0).simulate('click', 5);
		expect(wrapper).toMatchSnapshot();
		expect(rateArticle).toHaveBeenCalled();
	});

	it('should like an article', () => {
		const likeArticle = jest.fn(() => Promise.resolve({}));
		const props = {
			fetchArticle: jest.fn(),
			addcommment: jest.fn(),
			match: {
				params: {
					articleId: articles[0].id
				}
			},
			getArticleAvgRating: jest.fn(),
			likeArticle,
			dislikeArticle: jest.fn(),
			bookmarkArticle: jest.fn(),
			rateArticle: jest.fn(),
			articles,
			comments: {
				comments: []
			},
			getArticleLikes: jest.fn(),
			getArticleDislikes: jest.fn(),
			impressions: {
				likes: [],
				dislikes: [],
				ratings: [],
				userBookmarks: [],
			},
		};
		const wrapper = mount( <SingleArticleView {...props} /> );
		wrapper.find('.like-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(likeArticle).toHaveBeenCalled();
	});

	it('should fail to like an article', () => {
		const likeArticle = jest.fn(() => Promise.reject({}));
		const props = {
			fetchArticle: jest.fn(),
			addcommment: jest.fn(),
			match: {
				params: {
					articleId: articles[0].id
				}
			},
			getArticleAvgRating: jest.fn(),
			likeArticle,
			dislikeArticle: jest.fn(),
			bookmarkArticle: jest.fn(),
			rateArticle: jest.fn(),
			articles,
			comments: {
				comments: []
			},
			getArticleLikes: jest.fn(),
			getArticleDislikes: jest.fn(),
			impressions: {
				likes: [],
				dislikes: [],
				ratings: [],
				userBookmarks: [],
			},
		};
		const wrapper = mount( <SingleArticleView {...props} /> );
		wrapper.find('.like-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(likeArticle).toHaveBeenCalled();
	});

	it('should dislike an article', () => {
		const dislikeArticle = jest.fn(() => Promise.resolve({}));
		const props = {
			fetchArticle: jest.fn(),
			addcommment: jest.fn(),
			match: {
				params: {
					articleId: articles[0].id
				}
			},
			getArticleAvgRating: jest.fn(),
			likeArticle: jest.fn(),
			dislikeArticle,
			bookmarkArticle: jest.fn(),
			rateArticle: jest.fn(),
			articles,
			comments: {
				comments: []
			},
			getArticleLikes: jest.fn(),
			getArticleDislikes: jest.fn(),
			impressions: {
				likes: [],
				dislikes: [],
				ratings: [],
				userBookmarks: [],
			},
		};
		const wrapper = mount( <SingleArticleView {...props} /> );
		wrapper.find('.dislike-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(dislikeArticle).toHaveBeenCalled();
	});

	it('should fail to dislike an article', () => {
		const dislikeArticle = jest.fn(() => Promise.reject({}));
		const props = {
			fetchArticle: jest.fn(),
			addcommment: jest.fn(),
			match: {
				params: {
					articleId: articles[0].id
				}
			},
			getArticleAvgRating: jest.fn(),
			likeArticle: jest.fn(),
			dislikeArticle,
			bookmarkArticle: jest.fn(),
			rateArticle: jest.fn(),
			articles,
			comments: {
				comments: []
			},
			getArticleLikes: jest.fn(),
			getArticleDislikes: jest.fn(),
			impressions: {
				likes: [],
				dislikes: [],
				ratings: [],
				userBookmarks: [],
			},
		};
		const wrapper = mount( <SingleArticleView {...props} /> );
		wrapper.find('.dislike-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(dislikeArticle).toHaveBeenCalled();
	});

});
