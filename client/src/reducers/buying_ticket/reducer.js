import * as ACTION from "../../static/action_type";

export default function(state = null, action){
    switch(action.type){
        case ACTION.BUY_TICKET:
            console.log("reducer: ", action);
            return action.payload.data.result;
        case ACTION.BUY_LIST_RESET:
            return null;
        default:
            return state;
    }
}