import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api/user";

export function login(email, password){
    const request = axios.post(`${ROOT_URL}/login`, {
            email: email,
            password: password
    });
    return {
        type: ACTION.LOG_IN,
        payload: request
    };
}
