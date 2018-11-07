import * as ACTION from "../../static/action_type";

export default function(state = {
    "UserInfo": [{}],
    "Record": [{}]
}, action){
    console.log("promise:", action.payload);

    switch(action.type){
        case ACTION.PROFILE:
            if(action.payload.data.result === true ) {
                const jsonObject = {
                    "Record": action.payload.data.purchaseInfo,
                    "UserInfo": action.payload.data.userInfo
                };
                return jsonObject;
            }else{
                return {
                    "UserInfo": [{}],
                    "Record": [{}]
                };
            }
        default:
            return state;
    }
}