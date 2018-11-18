import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function sellTicket(eventName, seatRow, seatCol, userEmail, price){
    const request = axios.post(`${ROOT_URL}/main/addTicket`, {
        name: eventName,
        row: seatRow,
        col: seatCol,
        seller: userEmail,
        price: parseInt(price, 10) * 1.05
    });
    console.log("Event Action: ", request);

    return {
        type: ACTION.SELL_TICKET,
        payload: request
    };
}