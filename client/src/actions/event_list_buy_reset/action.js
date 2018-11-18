import * as ACTION from "../../static/action_type";

export function eventListBuyingReset(){
    return {
        type: ACTION.BUY_LIST_RESET,
        payload: ""
    };
}