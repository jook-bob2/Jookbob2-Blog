import { post } from 'axios';

export const GET_BOARDLIST = 'GET_BOARDLIST';
export const GET_BOARDFILTER = 'GET_BOARDFILTER';
export const GET_BOARDPAGE = 'GET_BOARDPAGE';

export const getBoardListData = (data) => {
    return {
        type: GET_BOARDLIST,
        data
    }
}

export const getBoardListing = (data, page, rowsPerPage) => {
    return (dispatch) => {
        const formData = new FormData();
        if (data) {
            formData.append('bno', data.bno);
            formData.append('content', data.content);
            formData.append('title', data.title);
            formData.append('writer', data.writer);
            formData.append('createStartDate', data.createStartDate);
            formData.append('createEndDate', data.createEndDate);
            formData.append('updateStartDate', data.updateStartDate);
            formData.append('updateEndDate', data.updateEndDate);
            formData.append('boardState', data.boardState);
            formData.append('brdCode', data.brdCode);
        }
        if (page && rowsPerPage) {
            formData.append('page', page);
            formData.append('rowsPerPage', rowsPerPage);
        }
        post('/boardManagement/boardList', formData)
            .then(res => {
                dispatch(getBoardListData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getBoardFilterData = (data) => {
    return {
        type: GET_BOARDFILTER,
        data
    }
}

export const getBoardFiltering = (state) => {
    return (dispatch) => {
        dispatch(getBoardFilterData(state));
    }
}

export const getBoardPageData = (data) => {
    return {
        type: GET_BOARDPAGE,
        data
    }
}

export const getBoardPaging = (page) => {
    return (dispatch) => {
        dispatch(getBoardPageData(page));
    }
}