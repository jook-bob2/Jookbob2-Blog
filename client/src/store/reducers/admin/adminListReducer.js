import { GET_ADMINLIST } from '../../actions/admin/adminList';

export default function (state = { values: '', adminCnt: 0}, action) {
    switch (action.type) {
        case GET_ADMINLIST:
            return {
                ...state,
                values: action.data.list,
                adminCnt: action.data.adminCnt
            } 
        default:
            return state;
    }
}