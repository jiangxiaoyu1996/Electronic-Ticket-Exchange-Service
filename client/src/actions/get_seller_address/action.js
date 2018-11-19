import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export function getSellerAddress(event, row, col){
    const request = axios.post(`${ROOT_URL}/main/getSeller`,{
        event: event,
        row: row,
        col: col
    });

    return {
        type: ACTION.SELLER_ADDRESS,
        payload: request
    };
}