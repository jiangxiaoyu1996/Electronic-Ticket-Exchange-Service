import * as ACTION from "../../static/action_type";

export default function(state = null, action){
    switch(action.type){
        case ACTION.LOCK_TICKET:
            return action.payload.data.success === true;
        case ACTION.LOCK_TICKET_RESET:
            return null
        case ACTION.UNLOCK_TICKET:
            return null;
        default:
            return state;
    }
}