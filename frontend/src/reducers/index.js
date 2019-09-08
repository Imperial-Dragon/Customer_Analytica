import { combineReducers } from 'redux';
import user from './user_reducer';
import customers from './customer_reducer'

const rootReducer = combineReducers({
    user,
    customers
});

export default rootReducer;