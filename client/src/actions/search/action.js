import axios from 'axios';
import * as ACTION from "../../static/action_type";

const ROOT_URL = "http://localhost:8080/api/main";

export function search(key, keyword){
    const request = axios.post(`${ROOT_URL}/search`, {
        keyword:{ [key] :keyword}
    });
    return {
        type: ACTION.SEARCH,
        payload: request
    };
}
