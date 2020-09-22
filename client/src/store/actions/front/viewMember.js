import { post } from 'axios';

export const GET_VIEWMEMBER = 'GET_VIEWMEMBER';

export const getViewMemberData = (data) => {
    return {
        type: GET_VIEWMEMBER,
        data
    }
}

export const getViewMember = () => {
    return (dispatch) => {
        post('/member/viewMember')
            .then(res => {
                dispatch(getViewMemberData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}