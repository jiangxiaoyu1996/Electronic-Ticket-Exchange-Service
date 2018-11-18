import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function getEventListForBuying(){
    const request = axios.get(`${ROOT_URL}/main/event_buying`);

    return {
        type: ACTION.BUY_LIST,
        payload: request
    };
}