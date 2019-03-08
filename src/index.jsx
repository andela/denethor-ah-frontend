import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import Main from './Main';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

const ConnectedApp = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
