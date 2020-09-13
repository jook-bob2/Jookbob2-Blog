import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';
import Axios from 'axios';
import {
    TableCell, 
    TableRow, 
    TableBody, 
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getMenuListing, getMenuFiltering, getMenuPaging } from 'store/actions/admin/menuList';

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    updateContent: {
        padding: 20
    },
    updateInput: {
        width: '100%',
        height: 21,
        backgroundColor: 'ivory',
        border: '1px solid skyblue',
        fontFamily: 'initial',
        fontSize: '10pt',
        color: 'red',
        textAlign: 'center',
    },
    updateDiv: {
        width: '100%',
        height: 325,
        border: '1px solid #000'
    },
    left: {
        width: '50%',
        float: 'left',
        boxSizing: 'border-box'
    }, 
    right :{
        width: '50%',
        float: 'right',
        boxSizing: "border-box"
    },
    updateSelect: {
        width: '100%',
        border: '1px solid skyblue',
        height: 25,
        backgroundColor: 'ivory',
        color: 'red'
    }
}));

const MenuListTable = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        menuCd: '',
        updateOpen: false,
        deleteOpen: false,
        restoreOpen: false
    });

    const [updateMenuList, setUpdateMenu] = useState({
        menuCd: '',
        upperMenuCd: '',
        menuNm: '',
        menuLvl: '',
        menuOrdr: '',
        pathSrc: '',
        menuType: ''
    });


    const handleClickOpen = (menuCd) => {
        setState(state => ({
            ...state,
            menuCd: menuCd,
            deleteOpen: true
        }));
    };

    const handleUpdateOpen = (prop) => {
        setState(state => ({
            ...state,
            menuCd: prop.menuCd,
            updateOpen: true
        }));
        
        setUpdateMenu({
            menuCd: prop.menuCd,
            upperMenuCd: prop.upperMenuCd,
            menuNm: prop.menuNm,
            menuLvl: prop.menuLvl,
            menuOrdr: prop.menuOrdr,
            pathSrc: prop.pathSrc
        });
    };

    const handleDeleteClose = () => {
        setState(state => ({
            ...state,
            deleteOpen: false
        }));
    };

    const handleRestoreOpen = (menuCd) => {
        setState(state => ({
            ...state,
            menuCd: menuCd,
            restoreOpen: true
        }));
    }

    const handleRestoreClose = () => {
        setState(state => ({
            ...state,
            restoreOpen: false
        }));
    };

    const handleUpdateClose = () => {
        setState(state => ({
            ...state,
            updateOpen: false
        }));
    };

    const deleteMenu = (event) => {
        event.preventDefault();
        
        Axios.delete(`/menu/menuDelete/${state.menuCd}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    deleteOpen: false
                }));

                dispatch(getMenuListing(null, props.page, 5));
                dispatch(getMenuFiltering());
                dispatch(getMenuPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const updateMenu = (event) => {
        event.preventDefault();

        const formData = new FormData();

        if (updateMenuList.menuCd === undefined || updateMenuList.menuCd === '') {
            alert('메뉴코드를 입력하세요.');
            return false;
        }

        formData.append('orgMenuCd', props.menuCd);
        formData.append('menuCd', updateMenuList.menuCd);
        formData.append('menuLvl', updateMenuList.menuLvl);
        formData.append('menuNm', updateMenuList.menuNm);
        formData.append('menuOrdr', updateMenuList.menuOrdr);
        formData.append('orgPathSrc', props.pathSrc);
        formData.append('pathSrc', updateMenuList.pathSrc);
        formData.append('upperMenuCd', updateMenuList.upperMenuCd);
        formData.append('menuType', updateMenuList.menuType);

        Axios.post(`/menu/menuUpdate`, formData)
            .then(res => {
                if (res.data === 'succeed') {
                    setState(state => ({
                        ...state,
                        updateOpen: false
                    }));
    
                    dispatch(getMenuListing(null, props.page, 5));
                    dispatch(getMenuFiltering());
                    dispatch(getMenuPaging(props.page));
                } else if (res.data === 'error') {
                    alert('메뉴코드가 중복 됩니다.');
                } else if (res.data === 'dupPath') {
                    alert('메뉴경로가 중복 됩니다.');
                }
            })
            .catch(err => {
                throw(err);
            });
    };

    const restoreMenu = (event) => {
        event.preventDefault();
        
        Axios.post(`/menu/menuRestore/${state.menuCd}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    restoreOpen: false
                }));

                dispatch(getMenuListing(null, props.page, 5));
                dispatch(getMenuFiltering());
                dispatch(getMenuPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const handleUpdateChange = (event) => {
        event.persist();
        setUpdateMenu(updateMenuList => ({
            ...updateMenuList,
            [event.target.name]: event.target.value
        }))
    };
    
    return (
        <TableBody className={classes.root}>
            <TableRow>
                <TableCell align='center'>
                    {props.menuCd}
                </TableCell>
                <TableCell align='center'>
                    {props.upperMenuCd === undefined || props.upperMenuCd === '' ? '최상위메뉴' : props.upperMenuCd}
                </TableCell>
                <TableCell align='center'>
                    {props.menuNm}
                </TableCell>
                <TableCell align='center'>
                    {props.menuLvl}
                </TableCell>
                <TableCell align='center'>
                    {props.menuOrdr}
                </TableCell>
                <TableCell align='center'>
                    {props.pathSrc === undefined ? 'NONE' : props.pathSrc}
                </TableCell>
                <TableCell align='center'>
                    {moment(props.createDt).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell align='center'>
                    {props.updateYn !== 'Y' ? 'NONE' : moment(props.updateDt).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell align='center'>
                    {props.updateYn === 'Y' ? '수정됨' : '수정안됨'}
                </TableCell>
                <TableCell align='center'>
                    {props.delYn === 'Y' ? '삭제됨' : '삭제안됨'}
                </TableCell>
                <TableCell align='center'>
                    <Button color="primary" variant="contained" 
                        onClick={() => handleUpdateOpen(props)}>
                        수정
                    </Button>
                    &nbsp;&nbsp;
                    {props.delYn !== 'Y' 
                        ?
                        <Button color="secondary" variant="contained" onClick={() => handleClickOpen(props.menuCd)}>
                            삭제
                        </Button>
                        :
                        <Button color="secondary" variant="contained" onClick={() => handleRestoreOpen(props.menuCd)}>
                            복구
                        </Button>
                    }
                </TableCell>
            </TableRow>

            <Dialog
                open={state.deleteOpen}
                onClose={handleDeleteClose}
            >
                <DialogTitle>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        해당 게시물을 삭제 하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.delete}
                        onClick={deleteMenu}
                    >
                        삭제
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDeleteClose}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={state.restoreOpen}
                onClose={handleRestoreClose}
            >
                <DialogTitle>
                    복구 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        해당 게시물을 복구 하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.delete}
                        onClick={restoreMenu}
                    >
                        복구
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRestoreClose}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={state.updateOpen}
                onClose={handleUpdateClose}
            >
                <form>
                    <DialogTitle>
                        메뉴 수정
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.updateDiv}>
                            <div className={classes.left}>
                                <div className={classes.updateContent}>
                                    <h4>메뉴코드</h4>
                                    <input type="text" defaultValue={updateMenuList.menuCd} name="menuCd"
                                    className={classes.updateInput} onChange={handleUpdateChange}></input>
                                </div>
                                <div className={classes.updateContent}>
                                    <h4>상위메뉴코드</h4>
                                    <input type="text" defaultValue={updateMenuList.upperMenuCd} name="upperMenuCd"
                                    className={classes.updateInput} onChange={handleUpdateChange}></input>
                                </div>
                                <div className={classes.updateContent}>
                                    <h4>메뉴이름</h4>
                                    <input type="text" defaultValue={updateMenuList.menuNm} name="menuNm"
                                    className={classes.updateInput} onChange={handleUpdateChange}></input>
                                </div>
                                <div className={classes.updateContent}>
                                    <h4>메뉴유형</h4>
                                    <select defaultValue={updateMenuList.menuType} onChange={handleUpdateChange} 
                                        name="menuType" className={classes.updateSelect}>
                                        <option value="" selected>선택해주세요.</option>
                                        <option value="list">리스트형</option>
                                        <option value="board">게시판형</option>
                                    </select>
                                </div>
                            </div>
                            <div className={classes.right}>
                                <div className={classes.updateContent}>
                                    <h4>메뉴레벨</h4>
                                    <input type="text" defaultValue={updateMenuList.menuLvl} name="menuLvl"
                                    className={classes.updateInput} onChange={handleUpdateChange}></input>
                                </div>
                                <div className={classes.updateContent}>
                                    <h4>메뉴순서</h4>
                                    <input type="text" defaultValue={updateMenuList.menuOrdr} name="menuOrdr"
                                    className={classes.updateInput} onChange={handleUpdateChange}></input>
                                </div>
                                <div className={classes.updateContent}>
                                    <h4>메뉴경로</h4>
                                    <input type="text" defaultValue={updateMenuList.pathSrc}  name="pathSrc"
                                    className={classes.updateInput} onChange={handleUpdateChange}></input>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={updateMenu}
                        >
                            수정
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleUpdateClose}
                        >
                            닫기
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </TableBody>
    );
};

export default MenuListTable;