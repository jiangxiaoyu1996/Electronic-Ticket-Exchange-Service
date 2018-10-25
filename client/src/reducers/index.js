import { combineReducers } from 'redux';
import AccountReducer from './account_access/reducer';

const rootReducer = combineReducers({
    user: AccountReducer
});

export default rootReducer;