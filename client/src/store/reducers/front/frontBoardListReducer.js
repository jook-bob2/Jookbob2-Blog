import { GET_FRONT_BOARDLIST } from '../../actions/front/boardList';

export default function (state = { 
    values: '', 
    count: 0,
    bKinds: ''
}, action) {
    switch (action.type) {
        case GET_FRONT_BOARDLIST:
            return {
                ...state,
                values: action.data.list,
                count: action.data.count,
                bKinds: action.data.list[0].bKinds
            } 
        default:
            return state;
    }
}