import { GET_ADMINPAGE } from '../actions/index';

export default function (state = 1, action) {
    switch (action.type) {
        case GET_ADMINPAGE:
            return {
                page: Number(action.data)
            } 
        default:
            return state;
    }
}