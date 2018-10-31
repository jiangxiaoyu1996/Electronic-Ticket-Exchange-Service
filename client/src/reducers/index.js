import { combineReducers } from 'redux';

import AccountReducer from './account_access/reducer';
import SearchReducer from './search/reducer';

const rootReducer = combineReducers({
    user: AccountReducer,
    search: SearchReducer
});

export default rootReducer;