import { GET_NOTICELIST } from '../../actions/admin/noticeList';

export default function (state = { values: '', adminCnt: 0}, action) {
    switch (action.type) {
        case GET_NOTICELIST:
            return {
                ...state,
                values: action.data.list,
                noticeCnt: action.data.noticeCnt
            } 
        default:
            return state;
    }
}