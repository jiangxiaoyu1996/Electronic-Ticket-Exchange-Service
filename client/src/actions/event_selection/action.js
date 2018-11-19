import * as ACTION from "../../static/action_type";

export function eventSelectionFromSearch(event){
    return {
        type: ACTION.EVENT_SELECTION,
        payload: event
    };
}