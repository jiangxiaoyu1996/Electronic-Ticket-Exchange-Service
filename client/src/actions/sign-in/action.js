import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api/user";

export function signin(email, password){
    const request = axios.post(`${ROOT_URL}/signup`, {
            email: email,
            password: password
    });
    console.log("action request: ", request);

    return {
        type: ACTION.SIGN_IN,
        payload: request
    };
}