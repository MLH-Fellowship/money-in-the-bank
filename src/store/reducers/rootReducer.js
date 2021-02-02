import userReducer from './userReducer'
import budgetReducer from './budgetReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user: userReducer,
    budget: budgetReducer,
    firebase: firebaseReducer
});

const persistConfig = {
    key: 'root',
    storage: storage
};

export default persistReducer(persistConfig,rootReducer);
