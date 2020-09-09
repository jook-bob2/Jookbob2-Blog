import { GET_MENUFILTER } from '../../actions/admin/menuList';

export default function (state = '', action) {
    
    switch (action.type) {
        case GET_MENUFILTER:
            return {
                ...state,
                values: action.data
            } 
        default:
            return state;
    }
}