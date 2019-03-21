import { combineReducers } from 'redux';
import articleReducer from './articles';
import userReducer from './users';
import tagReducer from './tags';
import commentReducer from './comments';
import categoryReducer from './categories';
import profileReducer from './profile';
import authReducer from './auth';
import filterReducer from './filters';
import authorReducer from './authors';
import elementStatusesReducer from './elementStatuses';

export default combineReducers({
	articles: articleReducer,
	users: userReducer,
	tags: tagReducer,
	comments: commentReducer,
	categories: categoryReducer,
	auth: authReducer,
	profile: profileReducer,
	filters: filterReducer,
	authors: authorReducer,
	elementStatuses: elementStatusesReducer,
});