import { GET_REPLYLIST } from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case GET_REPLYLIST:
            return {
                ...state,
                values: action.data.list
            } 
        default:
            return state;
    }
}