import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './utils/socket';
import './styles/style.scss';
import Main from './Main';
import storeConfig from './redux/configureStore';

const store = storeConfig();

const app = (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(app, document.getElementById("app"));
