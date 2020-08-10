import { post } from 'axios';

export const GET_SESSION = 'GET_SESSION';
export const GET_BRDSESSION = 'GET_BRDSESSION';
export const GET_REPLYLIST = 'GET_REPLYLIST';

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
                dispatch(getSessionData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getBrdSessionData = (data) => {
    return {
        type: GET_BRDSESSION,
        data
    }
}

export const getBrdSessioning = () => {
    return (dispatch) => {
        return post('/board/getSession')
            .then(res => {
                dispatch(getBrdSessionData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getReplyListData = (data) => {
    return {
        type: GET_REPLYLIST,
        data
    }
}

export const getReplyListing = (bno) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('bno', bno);
        return post('/reply/replyList', formData)
            .then(res=> {
                dispatch(getReplyListData(res.data));
            })
            .catch(err => {
                throw(err);
            })
    }
}