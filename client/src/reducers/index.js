import { combineReducers } from 'redux';

import * as Action from "../static/action_type";
import AccountReducer from './account_access/reducer';
import SearchReducer from './search/reducer';

const rootReducer = (state, action) => {
    if(action.type === Action.LOG_OUT){
        state = undefined
    }

    return appReducer(state, action)
};

const appReducer = combineReducers({
    user: AccountReducer,
    search: SearchReducer
});

export default rootReducer;