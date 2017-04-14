import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Импорт кастомных компонент
import PresetsViewer from './containers/presets-viewer';
import configureStore from './redux/store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PresetsViewer />
  </Provider>,
  document.getElementById('map')
);
