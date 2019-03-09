import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import articleReducer from './reducers/articles';
import authReducer from './reducers/auth';
import userReducer from './reducers/users';
import tagReducer from './reducers/tags';
import commentReducer from './reducers/comments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(
  combineReducers({
    articles: articleReducer,
    auth: authReducer,
    users: userReducer,
    tags: tagReducer,
    comments: commentReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
