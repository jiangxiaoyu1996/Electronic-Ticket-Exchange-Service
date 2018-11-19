import * as ACTION from "../../static/action_type";

export default function(state = {}, action){
    switch(action.type){
        case ACTION.BUY_LIST:
            return action.payload.data.result;
        case ACTION.BUY_LIST_RESET:
            return {};
        default:
            return state;
    }
}