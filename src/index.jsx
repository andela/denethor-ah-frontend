import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './utils/socket';
import './styles/style.scss';
import Main from './Main';
import storeConfig from './redux/configureStore';
import Radium from 'radium';

const store = storeConfig();

let Application = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

Application = Radium(Application);

ReactDOM.render(<Application />, document.getElementById("app"));
