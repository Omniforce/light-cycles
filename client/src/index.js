import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import lightcycles from './reducers'

import { setupSocket } from './sockets';

const store = createStore(lightcycles);
setupSocket(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
