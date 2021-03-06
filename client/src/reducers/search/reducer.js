import * as ACTION from "../../static/action_type";

export default function(state = [], action){
    switch(action.type){
    case ACTION.SEARCH:
        return typeof action.payload.data === 'undefined' ? false : action.payload.data.result;
    default:
        return state;
    }
}
