import { GET_MEMBERLIST } from '../../actions/admin/memberList';

export default function (state = { values: '', adminCnt: 0}, action) {
    switch (action.type) {
        case GET_MEMBERLIST:
            return {
                ...state,
                values: action.data.list,
                userCnt: action.data.userCnt
            } 
        default:
            return state;
    }
}