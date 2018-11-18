import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function unlockTicketForBuying(event, row, column){
    const request = axios.post(`${ROOT_URL}/main/unlockticket`, {
        event: event,
        row: row,
        col: column
    });

    return {
        type: ACTION.UNLOCK_TICKET,
        payload: request
    };
}