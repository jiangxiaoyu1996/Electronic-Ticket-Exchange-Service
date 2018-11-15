import * as ACTION from "../../static/action_type";

export default function(state = {}, action){
    switch(action.type){
        case ACTION.POST_LIST:
            return action.payload.data.result;
        default:
            return state;
    }
}