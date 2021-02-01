import userReducer from './userReducer'
import budgetReducer from './budgetReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    budget: budgetReducer
});

export default rootReducer;