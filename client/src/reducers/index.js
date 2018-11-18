import { combineReducers } from 'redux';

import * as Action from "../static/action_type";
import AccountReducer from './account_access/reducer';
import ProfileReducer from './profile/reducer';
import EventListPostingReducer from './event_list_post/reducer';
import SellingTicketReducer from "./selling_ticket/reducer";
import BuyingTicketReducer from "./buying_ticket/reducer";
import SearchReducer from './search/reducer';
import EventSelectionReducer from './event_selection/reducer';
import EventListBuyingReducer from './event_list_buy/reducer';
import LockTicketReducer from './lock_ticket/reducer';

const rootReducer = (state, action) => {
    if(action.type === Action.LOG_OUT){
        console.log("data: ", action.payload);
        state = undefined;
    }
    return appReducer(state, action);
};

const appReducer = combineReducers({
    user: AccountReducer,
    loggedin: AccountReducer,
    profile: ProfileReducer,
    eventListPosting: EventListPostingReducer,
    sellingTicketResult: SellingTicketReducer,
    buyingTicketResult: BuyingTicketReducer,
    result: SearchReducer,
    selectedEvent: EventSelectionReducer,
    eventListBuying: EventListBuyingReducer,
    lockTicket: LockTicketReducer,
});

export default rootReducer;
