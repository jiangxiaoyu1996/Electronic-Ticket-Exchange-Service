import * as ACTION from "../../static/action_type";

export default function(state = '', action){
    console.log("promise:", action.payload);
    switch(action.type){
    case ACTION.SIGN_IN:
        return action.payload.data.success === true ? action.payload.data.email : '';
    case ACTION.LOG_IN:
        return action.payload.data.loggedin === true ? action.payload.data.email : '';
    case ACTION.SEARCH:
        return action.payload.data.result;
    default:
        return state;
    }
}
