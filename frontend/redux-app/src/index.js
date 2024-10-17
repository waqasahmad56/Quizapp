import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
 
import { Provider } from 'react-redux';
// import { store } from './app/store';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>

      <App />
      </Router>

    </PersistGate>
    </Provider>

);





