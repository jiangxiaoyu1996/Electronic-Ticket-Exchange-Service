import * as ACTION from "../../static/action_type";

export function lockTicketReset(){
    return {
        type: ACTION.LOCK_TICKET_RESET,
        payload: ""
    };
}