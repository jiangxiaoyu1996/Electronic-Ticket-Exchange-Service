export default function(state = '', action){
    switch(action.type){
        case 'SIGN_IN':
        case 'LOGIN':
            return action.payload;
        default:
            return state;
    }
}