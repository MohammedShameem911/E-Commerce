import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Components/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Components/context/ContextProvider";

ReactDOM.render(
  <ContextProvider>
    <Provider store={store}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
  </ContextProvider>
  ,
  document.getElementById('root')
);