import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function lockTicketForBuying(event, row, column){
    const request = axios.post(`${ROOT_URL}/main/lockticket`, {
        event: event,
        row: row,
        col: column
    });

    return {
        type: ACTION.LOCK_TICKET,
        payload: request
    };
}