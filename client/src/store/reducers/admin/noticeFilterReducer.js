import { GET_NOTICEFILTER } from '../../actions/admin/noticeList';

export default function (state = '', action) {
    
    switch (action.type) {
        case GET_NOTICEFILTER:
            return {
                ...state,
                values: action.data
            } 
        default:
            return state;
    }
}