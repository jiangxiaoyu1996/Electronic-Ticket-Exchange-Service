import axios from 'axios';
import SIGN_IN from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api/user";

export function signin(email, password){
    const request = axios.post(`${ROOT_URL}/signup`, {
            email: email,
            password: password
    });
    console.log("action request: ", request);

    return {
        type: SIGN_IN,
        payload: request
    };
}