import * as ACTION from "../../static/action_type";

export default function(state = {}, action){
    switch(action.type){
        case ACTION.SELL_TICKET:
            console.log("reducer: ", action);
            return action.payload.data.result;
        default:
            return state;
    }
}