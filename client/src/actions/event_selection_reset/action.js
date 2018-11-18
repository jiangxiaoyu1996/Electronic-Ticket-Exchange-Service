import * as ACTION from "../../static/action_type";

export function eventSelectionReset(){
    return {
        type: ACTION.EVENT_SELECTION_RESET,
        payload: ""
    };
}