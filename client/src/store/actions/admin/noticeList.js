import { post } from 'axios';

export const GET_NOTICELIST = 'GET_NOTICELIST';
export const GET_NOTICEFILTER = 'GET_NOTICEFILTER';
export const GET_NOTICEPAGE = 'GET_NOTICEPAGE';

export const getNoticeListData = (data) => {
    return {
        type: GET_NOTICELIST,
        data
    }
}

export const getNoticeListing = (data, page, rowsPerPage) => {
    return (dispatch) => {
        const formData = new FormData();
        if (data) {
            formData.append('noticeNo', data.noticeNo);
            formData.append('content', data.content);
            formData.append('title', data.title);
            formData.append('writer', data.writer);
            formData.append('createStartDate', data.createStartDate);
            formData.append('createEndDate', data.createEndDate);
            formData.append('updateStartDate', data.updateStartDate);
            formData.append('updateEndDate', data.updateEndDate);
            formData.append('noticeState', data.noticeState);
            formData.append('brdCode', data.brdCode);
        }
        if (page && rowsPerPage) {
            formData.append('page', page);
            formData.append('rowsPerPage', rowsPerPage);
        }
        post('/notice/noticeList', formData)
            .then(res => {
                dispatch(getNoticeListData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getNoticeFilterData = (data) => {
    return {
        type: GET_NOTICEFILTER,
        data
    }
}

export const getNoticeFiltering = (state) => {
    return (dispatch) => {
        dispatch(getNoticeFilterData(state));
    }
}

export const getNoticePageData = (data) => {
    return {
        type: GET_NOTICEPAGE,
        data
    }
}

export const getNoticePaging = (page) => {
    return (dispatch) => {
        dispatch(getNoticePageData(page));
    }
}