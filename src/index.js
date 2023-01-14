import React from 'react';
import { createRoot } from 'react-dom/client';//allows use to use react with the DOM
import { HashRouter } from 'react-router-dom';//we need this library for Hashrouter whcih listens for a hashchange so that we don't have to do it
import { Provider } from 'react-redux';//connects use to our store
import store from './store';
import App from './App';




const root = createRoot(document.querySelector('#root'));
root.render(<HashRouter>
  <Provider store={store}>
    <App />
  </Provider>
</HashRouter>);//this is wrapp in HashRouter because it is listening for ANY hash change
