import { post } from 'axios';

export const GET_FRONT_BOARDLIST = 'GET_FRONT_BOARDLIST';
export const GET_FRONT_BOARDFILTER = 'GET_FRONT_BOARDFILTER';
export const GET_FRONT_BOARDPAGE = 'GET_FRONT_BOARDPAGE';

export const getFrontBoardListData = (data) => {
    return {
        type: GET_FRONT_BOARDLIST,
        data
    }
}

export const getFrontBoardListing = (brdText, page, rowsPerPage) => {
    return (dispatch) => {
        const formData = new FormData();

        formData.append('brdText', brdText);
        formData.append('page', page);
        formData.append('rowsPerPage', rowsPerPage);

        post('/board/boardList', formData)
            .then(res => {
                dispatch(getFrontBoardListData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getFrontBoardFilterData = (data) => {
    return {
        type: GET_FRONT_BOARDFILTER,
        data
    }
}

export const getFrontBoardFiltering = (state) => {
    return (dispatch) => {
        dispatch(getFrontBoardFilterData(state));
    }
}

export const getFrontBoardPageData = (data) => {
    return {
        type: GET_FRONT_BOARDPAGE,
        data
    }
}

export const getFrontBoardPaging = (page) => {
    return (dispatch) => {
        dispatch(getFrontBoardPageData(page));
    }
}