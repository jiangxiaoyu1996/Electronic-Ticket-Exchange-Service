import * as ACTION from "../../static/action_type";

export function sellerAddressReset(){
    return {
        type: ACTION.SELLER_ADDRESS_RESET,
        payload: ''
    };
}