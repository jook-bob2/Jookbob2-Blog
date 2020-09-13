import { GET_BOARDKINDSFILTER } from '../../actions/admin/boardKindsList';

export default function (state = '', action) {
    
    switch (action.type) {
        case GET_BOARDKINDSFILTER:
            return {
                ...state,
                values: action.data
            } 
        default:
            return state;
    }
}