import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function buyTicket(email, eventName, seatRow, seatCol, payment){
    const request = axios.post(`${ROOT_URL}/main/buyticket`, {
        email: email,
        event: eventName,
        row: seatRow,
        col: seatCol,
        payment: payment
    });

    return {
        type: ACTION.BUY_TICKET,
        payload: request
    };
}