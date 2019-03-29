import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import storeConfig from '../../../redux/configureStore';
import { SingleArticleView } from '../../../components/articles/ArticlePage';
import articles from '../../mock-data/articles';
	
const store = storeConfig();
const commentsLikes = [];

jest.mock('../../../utils/socket.js');

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

			}],
			commentsLikes
		},
		impressions:{
			likes:[],
			dislikes:[]
		} 
	};
	it('should render single article view page', () => {
		const wrapper = mount(<Provider store={store}><SingleArticleView {...props} /></Provider>);
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
			isLoggedIn: true,
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
	
				}],
				commentsLikes
			},
			impressions:{
				likes:[],
				dislikes:[]
			} 
		};
		const wrapper = mount(<Provider store={store}><SingleArticleView {...props} /></Provider>);
		wrapper.find('.rating-stars span').at(0).simulate('click', 5);
		expect(wrapper).toMatchSnapshot();
		expect(rateArticle).toHaveBeenCalled();
	});

	it('should call toast error when starclickhandle is called', () => {
		const rateArticle = jest.fn(() => Promise.reject({}));
		const props = {
			isLoggedIn: true,
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
	
				}],
				commentsLikes
			},
			impressions:{
				likes:[],
				dislikes:[]
			} 
		};
		const wrapper = mount(<Provider store={store}><SingleArticleView {...props} /></Provider>);
		wrapper.find('.rating-stars span').at(0).simulate('click', 5);
		expect(wrapper).toMatchSnapshot();
		expect(rateArticle).toHaveBeenCalled();
	});

	it('should like an article', () => {
		const likeArticle = jest.fn(() => Promise.resolve({}));
		const props = {
			isLoggedIn: true,
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
				comments: [{
					user: {
						firstname: 'Peace',
						lastname: 'Oyedeji'
					}
	
				}],
				commentsLikes
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
		const wrapper = mount( <Provider store={store}><SingleArticleView {...props} /></Provider> );
		wrapper.find('.like-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(likeArticle).toHaveBeenCalled();
	});

	it('should fail to like an article', () => {
		const likeArticle = jest.fn(() => Promise.reject({}));
		const props = {
			isLoggedIn: true,
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
				comments: [{
					user: {
						firstname: 'Peace',
						lastname: 'Oyedeji'
					}
	
				}],
				commentsLikes
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
		const wrapper = mount( <Provider store={store}><SingleArticleView {...props} /></Provider> );
		wrapper.find('.like-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(likeArticle).toHaveBeenCalled();
	});

	it('should dislike an article', () => {
		const dislikeArticle = jest.fn(() => Promise.resolve({}));
		const props = {
			isLoggedIn: true,
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
				comments: [{
					user: {
						firstname: 'Peace',
						lastname: 'Oyedeji'
					}
	
				}],
				commentsLikes
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
		const wrapper = mount( <Provider store={store}><SingleArticleView {...props} /></Provider> );
		wrapper.find('.dislike-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(dislikeArticle).toHaveBeenCalled();
	});

	it('should fail to dislike an article', () => {
		const dislikeArticle = jest.fn(() => Promise.reject({}));
		const props = {
			isLoggedIn: true,
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
				comments: [{
					user: {
						firstname: 'Peace',
						lastname: 'Oyedeji'
					}
	
				}],
				commentsLikes
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
		const wrapper = mount( <Provider store={store}><SingleArticleView {...props} /></Provider> );
		wrapper.find('.dislike-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(dislikeArticle).toHaveBeenCalled();
	});

});
