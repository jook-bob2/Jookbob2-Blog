import { GET_BOARDLIST } from '../../actions/admin/boardList';

export default function (state = { values: '', adminCnt: 0}, action) {
    switch (action.type) {
        case GET_BOARDLIST:
            return {
                ...state,
                values: action.data.list,
                boardCnt: action.data.boardCnt
            } 
        default:
            return state;
    }
}