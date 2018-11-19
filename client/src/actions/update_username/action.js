import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function updateUsername(address){
    const request = axios.post(`${ROOT_URL}/user/updateUsername`, {
        address: address
    });

    return {
        type: ACTION.UPDATE_USERNAME,
        payload: request
    };
}