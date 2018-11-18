import * as ACTION from "../../static/action_type";

export default function(state = "", action){
    switch(action.type){
        case ACTION.EVENT_SELECTION:
            console.log("reducer: ", action);
            return action.payload;
        default:
            return state;
    }
}