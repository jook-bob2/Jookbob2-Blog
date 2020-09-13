import { post } from 'axios';

export const GET_BOARDKINDSLIST = 'GET_BOARDKINDSLIST';
export const GET_BOARDKINDSFILTER = 'GET_BOARDKINDSFILTER';
export const GET_BOARDKINDSPAGE = 'GET_BOARDKINDSPAGE';

export const getBoardKindsListData = (data) => {
    return {
        type: GET_BOARDKINDSLIST,
        data
    }
}

export const getBoardKindsListing = (data, page, rowsPerPage) => {
    return (dispatch) => {
        const formData = new FormData();
        if (data) {
            formData.append('brdCode', data.brdCode);
            formData.append('showText', data.showText);
            formData.append('brdText', data.brdText);
            formData.append('createStartDate', data.createStartDate);
            formData.append('createEndDate', data.createEndDate);
            formData.append('updateStartDate', data.updateStartDate);
            formData.append('updateEndDate', data.updateEndDate);
            formData.append('boardKindsState', data.boardKindsState);
        }
        if (page && rowsPerPage) {
            formData.append('page', page);
            formData.append('rowsPerPage', rowsPerPage);
        }
        post('/boardKinds/boardKindsList', formData)
            .then(res => {
                dispatch(getBoardKindsListData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getBoardKindsFilterData = (data) => {
    return {
        type: GET_BOARDKINDSFILTER,
        data
    }
}

export const getBoardKindsFiltering = (state) => {
    return (dispatch) => {
        dispatch(getBoardKindsFilterData(state));
    }
}

export const getBoardKindsPageData = (data) => {
    return {
        type: GET_BOARDKINDSPAGE,
        data
    }
}

export const getBoardKindsPaging = (page) => {
    return (dispatch) => {
        dispatch(getBoardKindsPageData(page));
    }
}