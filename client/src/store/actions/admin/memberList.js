import { post } from 'axios';

export const GET_MEMBERLIST = 'GET_MEMBERLIST';
export const GET_MEMBERFILTER = 'GET_MEMBERFILTER';
export const GET_MEMBERPAGE = 'GET_MEMBERPAGE';

export const getMemberListData = (data) => {
    return {
        type: GET_MEMBERLIST,
        data
    }
}

export const getMemberListing = (data, page, rowsPerPage) => {
    return (dispatch) => {
        const formData = new FormData();
        if (data) {
            formData.append('userId', data.userId);
            formData.append('email', data.email);
            formData.append('name', data.name);
            formData.append('phoneNo', data.phoneNo);
            formData.append('startDate', data.startDate);
            formData.append('endDate', data.endDate);
            formData.append('userState', data.userState);
        }
        if (page && rowsPerPage) {
            formData.append('page', page);
            formData.append('rowsPerPage', rowsPerPage);
        }
        post('/user/userList', formData)
            .then(res => {
                dispatch(getMemberListData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getMemberFilterData = (data) => {
    return {
        type: GET_MEMBERFILTER,
        data
    }
}

export const getMemberFiltering = (state) => {
    return (dispatch) => {
        dispatch(getMemberFilterData(state));
    }
}

export const getMemberPageData = (data) => {
    return {
        type: GET_MEMBERPAGE,
        data
    }
}

export const getMemberPaging = (page) => {
    return (dispatch) => {
        dispatch(getMemberPageData(page));
    }
}