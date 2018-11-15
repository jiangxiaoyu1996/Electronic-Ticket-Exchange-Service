import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function getEventListForPosting(){
    const request = axios.get(`${ROOT_URL}/main/event`);
    console.log("Event Action: ", request);

    return {
        type: ACTION.POST_LIST,
        payload: request
    };
}