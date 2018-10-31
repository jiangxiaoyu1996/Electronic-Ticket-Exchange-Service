import * as ACTION from "../../static/action_type";

export default function(state = [], action){
    console.log("promise:", action.payload);
    switch(action.type){
        case ACTION.SEARCH:
            return action.payload.data.result;
        default:
            return state;
    }
}