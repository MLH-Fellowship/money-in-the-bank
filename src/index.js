import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import {
  getFirestore,
  reduxFirestore
} from "redux-firestore";
import { 
  reactReduxFirebase, 
  getFirebase 
} from "react-redux-firebase";
import fbConfig from "./fbConfig";
import firebase from "firebase/app";
// const store = createStore(rootReducer, applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

