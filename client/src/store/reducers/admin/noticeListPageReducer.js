import { GET_NOTICEPAGE } from '../../actions/admin/noticeList';

export default function (state = 1, action) {
    switch (action.type) {
        case GET_NOTICEPAGE:
            return {
                page: Number(action.data)
            } 
        default:
            return state;
    }
}