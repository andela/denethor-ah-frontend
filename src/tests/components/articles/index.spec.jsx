import React from 'react';
import { mount } from 'enzyme';
import uuid from 'uuid/v1';
import { Provider } from 'react-redux';
import storeConfig from '../../../redux/configureStore';
import { SingleArticleView } from '../../../components/articles/ArticlePage';
import TagEntries from '../../../components/articles/tags/TagEntries';
import articles from '../../mock-data/articles';
	
const store = storeConfig();
const commentsLikes = [];
const tags = [
	{
		"id": "e1e0af51-977b-4c52-8015-061cb953d10a",
		"tagText": "andela",
		"TagArticle": {
			"articleId": "0ce57cb7-c380-4bc0-857e-2a76073c9ab2",
			"tagId": "e1e0af51-977b-4c52-8015-061cb953d10a"
		}
	},
];

jest.mock('uuid/v1');
jest.mock('../../../utils/socket.js');

uuid.mockReturnValue('string');

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
		},
		quickAuthAction: {
			active: false,
			currentAction: 'login'
		},
		activateQuickAuthAction: jest.fn()
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

	it('should render the comment entry section', () => {
		const wrapper = mount(<TagEntries tagEntries =  { tags } />);
		expect(wrapper.length).toBe(1);
		expect(wrapper.find('.tags__section').length).toBe(1);
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
			},
			quickAuthAction: {
				active: false,
				currentAction: 'login'
			},
			activateQuickAuthAction: jest.fn()
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
			},
			quickAuthAction: {
				active: false,
				currentAction: 'login'
			},
			activateQuickAuthAction: jest.fn()
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
			quickAuthAction: {
				active: false,
				currentAction: 'login'
			},
			activateQuickAuthAction: jest.fn()
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
			quickAuthAction: {
				active: false,
				currentAction: 'login'
			},
			activateQuickAuthAction: jest.fn()
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
			quickAuthAction: {
				active: false,
				currentAction: 'login'
			},
			activateQuickAuthAction: jest.fn()
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
			quickAuthAction: {
				active: false,
				currentAction: 'login'
			},
			activateQuickAuthAction: jest.fn()
		};
		const wrapper = mount( <Provider store={store}><SingleArticleView {...props} /></Provider> );
		wrapper.find('.dislike-icon').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
		expect(dislikeArticle).toHaveBeenCalled();
	});

});
