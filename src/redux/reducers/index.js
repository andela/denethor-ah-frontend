import { combineReducers } from 'redux';
import articleReducer from './articles';
import userReducer from './users';
import tagReducer from './tags';
import commentReducer from './comments';
import categoryReducer from './categories';
import authReducer from './auth';


export default combineReducers({
	articles: articleReducer,
	users: userReducer,
	tags: tagReducer,
	comments: commentReducer,
	categories: categoryReducer,
	auth: authReducer
});