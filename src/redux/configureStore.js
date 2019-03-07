import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import articleReducer from './reducers/articles';
import userReducer from './reducers/users';
import tagReducer from './reducers/tags';
import commentReducer from './reducers/comments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => createStore(
  combineReducers({
    articles: articleReducer,
    users: userReducer,
    tags: tagReducer,
    comments: commentReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
