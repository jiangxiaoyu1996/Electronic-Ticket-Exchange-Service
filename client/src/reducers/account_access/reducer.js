import * as ACTION from "../../static/action_type";

export default function(state = '', action){
    console.log("promise:", action.payload);
    switch(action.type){
        case ACTION.SIGN_IN:
            return action.payload.data.success === true ? action.payload.data.email : '';
        case 'LOGIN':
        default:
            return state;
    }
}