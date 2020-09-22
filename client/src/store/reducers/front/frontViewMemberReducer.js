import { GET_VIEWMEMBER } from '../../actions/front/viewMember';

export default function (state = { 
    name: '',
    avatar: '',
    email: '',
    userId: '',
    file: null,
    userName: '',
    fileName: '',
    createDt: '',
    updateDt: '',
    phoneNo: '',
    address1: '',
    address2: ''
}, action) {
    switch (action.type) {
        case GET_VIEWMEMBER:
            if (action.data.list !== undefined) {
                return {
                    ...state,
                    name: action.data.list.name,
                    avatar: action.data.list.profileImg,
                    email: action.data.list.email,
                    userId: action.data.list.userId,
                    userName: action.data.list.name,
                    createDt: action.data.list.createDt,
                    updateDt: action.data.list.updateDt,
                    phoneNo: action.data.list.phoneNo,
                    postNo: action.data.list.postNo,
                    address1: action.data.list.address1,
                    address2: action.data.list.address2,
                }
            }
            return {}
        default:
            return state;
    }
}