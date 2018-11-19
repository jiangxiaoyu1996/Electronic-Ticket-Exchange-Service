import * as ACTION from "../../static/action_type";

export default function(state = '', action){
    switch(action.type){
        case ACTION.SIGN_IN:
            return action.payload.data.success === true ? action.payload.data.email : 'error';
        case ACTION.LOG_IN:
            return typeof action.payload.data !== 'undefined' && action.payload.data.loggedin === true ? action.payload.data.loggedin : false;
        default:
            return state;
    }
}
