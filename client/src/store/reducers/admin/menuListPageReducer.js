import { GET_MENUPAGE } from '../../actions/admin/menuList';

export default function (state = 1, action) {
    switch (action.type) {
        case GET_MENUPAGE:
            return {
                page: Number(action.data)
            } 
        default:
            return state;
    }
}