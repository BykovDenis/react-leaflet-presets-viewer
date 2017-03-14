import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Импорт кастомных компонент
import App from './containers/app';
import configureStore from './redux/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
