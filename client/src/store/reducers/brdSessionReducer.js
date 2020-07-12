import { GET_BRDSESSION } from '../actions/index';

export default function (state = [], action) {
    switch (action.type) {
        case GET_BRDSESSION:
            return {
                ...state,
                bno: action.data.bno,
                memberNo: action.data.memberNo
            } 
        default:
            return state;
    }
}