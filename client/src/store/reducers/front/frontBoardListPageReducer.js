import { GET_FRONT_BOARDPAGE } from '../../actions/front/boardList';

export default function (state = 1, action) {
    switch (action.type) {
        case GET_FRONT_BOARDPAGE:
            return {
                page: Number(action.data)
            } 
        default:
            return state;
    }
}