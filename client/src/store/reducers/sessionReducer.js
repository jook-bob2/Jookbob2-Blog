import { GET_SESSION } from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case GET_SESSION:
            return {
                ...state,
                memberNo: action.data,
                authenticated: action.data !== -1 ? true : false
            }        
        default:
            return state;
    }
}