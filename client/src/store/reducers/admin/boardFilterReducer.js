import { GET_BOARDFILTER } from '../../actions/admin/boardList';

export default function (state = '', action) {
    
    switch (action.type) {
        case GET_BOARDFILTER:
            return {
                ...state,
                values: action.data
            } 
        default:
            return state;
    }
}