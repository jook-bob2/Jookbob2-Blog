import { GET_MEMBERPAGE } from '../../actions/admin/memberList';

export default function (state = 1, action) {
    switch (action.type) {
        case GET_MEMBERPAGE:
            return {
                page: Number(action.data)
            } 
        default:
            return state;
    }
}