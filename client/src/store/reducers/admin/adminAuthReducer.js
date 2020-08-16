import { GET_ADMINAUTH } from '../../actions/admin/adminList';

export default function (state = '', action) {
    switch (action.type) {
        case GET_ADMINAUTH:
            return {
                ...state,
                adminNo: action.data,
                authenticated: action.data !== -1 ? true : false
            } 
        default:
            return state;
    }
}