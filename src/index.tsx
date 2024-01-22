import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FormReducer from './components/FormReducer';



const store = configureStore({
  reducer: {
    users: FormReducer
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>    
  </>
);

