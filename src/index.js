import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore
} from "redux-firestore";
import { 
  ReactReduxFirebaseProvider,
  getFirebase 
} from "react-redux-firebase";
import fbConfig from "./fbConfig";
import firebase from "firebase/app";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector  } from 'react-redux';
import { isLoaded  } from 'react-redux-firebase';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);

const persistor = persistStore(store);

const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false
}

const newFbconfig = Object.assign(fbConfig, profileSpecificProps);

const rrfProps = {
  firebase,
  config: newFbconfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className="center"> <p>Loading...</p></div>;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <PersistGate  persistor={persistor}>
        <AuthIsLoaded>
          <App/>
        </AuthIsLoaded>
      </PersistGate>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
