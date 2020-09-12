import { GET_FRONT_BOARDFILTER } from '../../actions/front/boardList';

export default function (state = '', action) {
    
    switch (action.type) {
        case GET_FRONT_BOARDFILTER:
            return {
                ...state,
                values: action.data
            } 
        default:
            return state;
    }
}