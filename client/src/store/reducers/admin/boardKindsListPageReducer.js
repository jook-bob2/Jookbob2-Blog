import { GET_BOARDKINDSPAGE } from '../../actions/admin/boardKindsList';

export default function (state = 1, action) {
    switch (action.type) {
        case GET_BOARDKINDSPAGE:
            return {
                page: Number(action.data)
            } 
        default:
            return state;
    }
}