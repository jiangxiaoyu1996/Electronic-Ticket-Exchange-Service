import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function getProfile(){
    const request = axios.get(`${ROOT_URL}/profile`);
    console.log("Action: ", request);

    return {
        type: ACTION.PROFILE,
        payload: request
    };
}