import { GET_ADMINFILTER } from '../actions/index';

export default function (state = '', action) {
    
    switch (action.type) {
        case GET_ADMINFILTER:
            return {
                ...state,
                values: action.data
            } 
        default:
            return state;
    }
}