import { post } from 'axios';

export const GET_SESSION = 'GET_SESSION';
export const GET_BRDSESSION = 'GET_BRDSESSION';
export const GET_REPLYLIST = 'GET_REPLYLIST';
export const GET_ADMINLIST = 'GET_ADMINLIST';
export const GET_ADMINFILTER = 'GET_ADMINFILTER';
export const GET_ADMINPAGE = 'GET_ADMINPAGE';

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

export const getAdminListData = (data) => {
    return {
        type: GET_ADMINLIST,
        data
    }
}

export const getAdminListing = (data, page, rowsPerPage) => {
    return (dispatch) => {
        const formData = new FormData();
        if (data) {
            formData.append('adminId', data.adminId);
            formData.append('email', data.email);
            formData.append('name', data.name);
            formData.append('phoneNo', data.phoneNo);
            formData.append('startDate', data.startDate);
            formData.append('endDate', data.endDate);
            formData.append('adminState', data.adminState);
        }
        if (page && rowsPerPage) {
            formData.append('page', page);
            formData.append('rowsPerPage', rowsPerPage);
        }
        post('/admin/adminList', formData)
            .then(res => {
                dispatch(getAdminListData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getAdminFilterData = (data) => {
    return {
        type: GET_ADMINFILTER,
        data
    }
}

export const getAdminFiltering = (state) => {
    return (dispatch) => {
        dispatch(getAdminFilterData(state));
    }
}

export const getAdminPageData = (data) => {
    return {
        type: GET_ADMINPAGE,
        data
    }
}

export const getAdminPaging = (page) => {
    return (dispatch) => {
        dispatch(getAdminPageData(page));
    }
}