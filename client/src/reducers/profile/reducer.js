import * as ACTION from "../../static/action_type";

export default function(state = {}, action){
    console.log("promise:", action.payload);

    switch(action.type){
        case ACTION.PROFILE:
            if(action.payload.data.success === true ) {
                const jsonObject = {
                    "SellRecord": action.payload.data.purchaseInfo,
                    "PurchaseRecord": action.payload.data.purchaseInfo,
                    "UserInfo": action.payload.data.userInfo
                }
                return jsonObject;
            }else{
                return {};
            }
        default:
            return state;
    }
}