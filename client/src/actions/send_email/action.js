import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api/main";

axios.defaults.withCredentials = true;

export function sendEmail(email, event, row, col, delivery){
    const request = axios.post(`${ROOT_URL}/sendEmail`, {
        email: email,
        row: row,
        col: col,
        event: event,
        delivery: delivery
    });

    return {
        type: ACTION.SEND_EMAIL,
        payload: request
    };
}