import { post } from 'axios';

export const GET_SESSION = 'GET_SESSION';

export const getSessionData = (data) => {
    return {
        type: GET_SESSION,
        data
    }
}

export const getSessioning = () => {
    return (dispatch) => {
        return post('/member/session')
            .then(res => {
                dispatch(getSessionData(res.data))
            })
            .catch(err => {
                console.log(err);
                throw(err);
            });
    }
}