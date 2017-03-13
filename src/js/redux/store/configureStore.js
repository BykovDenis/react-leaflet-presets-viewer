import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../combineReducer';
import { ping } from '../enhancers/ping';

export default function configureStore() {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, ping)));

  if (module.hot) {
    module.hot.accept('../combineReducer', () => {
      const nextRootReducer = reducer;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
