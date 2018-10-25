export default function(state = '', action){
    console.log("promise:", action.payload);
    switch(action.type){
        case "SIGN_IN":
        case 'LOGIN':
            return action.payload.data;
        default:
            return state;
    }
}