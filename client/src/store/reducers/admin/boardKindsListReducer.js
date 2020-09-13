import { GET_BOARDKINDSLIST } from '../../actions/admin/boardKindsList';

export default function (state = { values: '', menuCnt: 0}, action) {
    switch (action.type) {
        case GET_BOARDKINDSLIST:
            return {
                ...state,
                values: action.data.list,
                boardKindsCnt: action.data.boardKindsCnt
            } 
        default:
            return state;
    }
}