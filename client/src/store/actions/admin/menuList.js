import { post } from 'axios';

export const GET_MENULIST = 'GET_MENULIST';
export const GET_MENUFILTER = 'GET_MENUFILTER';
export const GET_MENUPAGE = 'GET_MENUPAGE';

export const getMenuListData = (data) => {
    return {
        type: GET_MENULIST,
        data
    }
}

export const getMenuListing = (data, page, rowsPerPage) => {
    return (dispatch) => {
        const formData = new FormData();
        if (data) {
            formData.append('menuCd', data.menuCd);
            formData.append('upperMenuCd', data.upperMenuCd);
            formData.append('menuNm', data.menuNm);
            formData.append('menuLvl', data.menuLvl);
            formData.append('menuOrdr', data.menuOrdr);
            formData.append('pathSrc', data.pathSrc);
            formData.append('createStartDate', data.createStartDate);
            formData.append('createEndDate', data.createEndDate);
            formData.append('updateStartDate', data.updateStartDate);
            formData.append('updateEndDate', data.updateEndDate);
            formData.append('menuState', data.menuState);
        }
        if (page && rowsPerPage) {
            formData.append('page', page);
            formData.append('rowsPerPage', rowsPerPage);
        }
        post('/menu/menuList', formData)
            .then(res => {
                dispatch(getMenuListData(res.data));
            })
            .catch(err => {
                throw(err);
            });
    }
}

export const getMenuFilterData = (data) => {
    return {
        type: GET_MENUFILTER,
        data
    }
}

export const getMenuFiltering = (state) => {
    return (dispatch) => {
        dispatch(getMenuFilterData(state));
    }
}

export const getMenuPageData = (data) => {
    return {
        type: GET_MENUPAGE,
        data
    }
}

export const getMenuPaging = (page) => {
    return (dispatch) => {
        dispatch(getMenuPageData(page));
    }
}