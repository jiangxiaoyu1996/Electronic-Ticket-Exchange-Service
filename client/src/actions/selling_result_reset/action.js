import * as ACTION from "../../static/action_type";

export function sellTicketReset(){
    return {
        type: ACTION.SELL_TICKET_RESET,
        payload: ""
    };
}