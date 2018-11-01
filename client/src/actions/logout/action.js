import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api/user";

axios.defaults.withCredentials = true;

export function logout(){
    const request = axios.delete(`${ROOT_URL}/logout`);

    return {
        type: ACTION.LOG_OUT,
        payload: request
    };
}