import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function updateUsername(username){
    const request = axios.post(`${ROOT_URL}/user/updateUsername`, {
        username: username
    });

    return {
        type: ACTION.UPDATE_USERNAME,
        payload: request
    };
}