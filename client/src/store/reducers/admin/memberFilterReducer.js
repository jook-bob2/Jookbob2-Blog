import { GET_MEMBERFILTER } from '../../actions/admin/memberList';

export default function (state = '', action) {
    
    switch (action.type) {
        case GET_MEMBERFILTER:
            return {
                ...state,
                values: action.data
            } 
        default:
            return state;
    }
}