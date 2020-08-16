import { GET_BOARDPAGE } from '../../actions/admin/boardList';

export default function (state = 1, action) {
    switch (action.type) {
        case GET_BOARDPAGE:
            return {
                page: Number(action.data)
            } 
        default:
            return state;
    }
}