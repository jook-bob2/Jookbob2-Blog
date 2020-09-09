import { GET_MENULIST } from '../../actions/admin/menuList';

export default function (state = { values: '', menuCnt: 0}, action) {
    switch (action.type) {
        case GET_MENULIST:
            return {
                ...state,
                values: action.data.list,
                menuCnt: action.data.menuCnt
            } 
        default:
            return state;
    }
}