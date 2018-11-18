import * as ACTION from "../../static/action_type";

export default function(state = "", action){
    switch(action.type){
        case ACTION.EVENT_SELECTION:
            return action.payload;
        case ACTION.EVENT_SELECTION_RESET:
            return "";
        default:
            return state;
    }
}