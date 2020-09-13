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
import { getBoardKindsListing, getBoardKindsPaging, getBoardKindsFiltering } from 'store/actions/admin/boardKindsList';

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
        height: 250,
        border: '1px solid #000'
    },
    updateSelect: {
        width: '100%',
        border: '1px solid skyblue',
        height: 25,
        backgroundColor: 'ivory',
        color: 'red'
    }
}));

const BoardKindsListTable = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        brdCode: '',
        updateOpen: false,
        deleteOpen: false,
        restoreOpen: false
    });

    const [updateBoardKindsList, setUpdateBoardKinds] = useState({
        brdCode: '',
        brdText: '',
        showText: '',
    });


    const handleClickOpen = (brdCode) => {
        setState(state => ({
            ...state,
            brdCode: brdCode,
            deleteOpen: true
        }));
    };

    const handleUpdateOpen = (prop) => {
        setState(state => ({
            ...state,
            brdCode: prop.brdCode,
            updateOpen: true
        }));
        
        setUpdateBoardKinds({
            brdCode: prop.brdCode,
            brdText: prop.brdText,
            showText: prop.showText,
        });
    };

    const handleDeleteClose = () => {
        setState(state => ({
            ...state,
            deleteOpen: false
        }));
    };

    const handleRestoreOpen = (brdCode) => {
        setState(state => ({
            ...state,
            brdCode: brdCode,
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

    const deleteBoardKinds = (event) => {
        event.preventDefault();
        
        Axios.delete(`/boardKinds/boardKindsDelete/${state.brdCode}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    deleteOpen: false
                }));

                dispatch(getBoardKindsListing(null, props.page, 5));
                dispatch(getBoardKindsFiltering());
                dispatch(getBoardKindsPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const updateBoardKinds = (event) => {
        event.preventDefault();

        const formData = new FormData();

        if (updateBoardKindsList.brdCode === undefined || updateBoardKindsList.brdCode === '') {
            alert('종류코드를 입력하세요.');
            return false;
        } else if (updateBoardKindsList.brdText === undefined || updateBoardKindsList.brdText === '') {
            alert('게시판경로를 입력하세요.');
            return false;
        } else if (updateBoardKindsList.showText === undefined || updateBoardKindsList.showText === '') {
            alert('게시판이름를 입력하세요.');
            return false;
        }

        formData.append('orgBrdCode', props.brdCode);
        formData.append('brdCode', updateBoardKindsList.brdCode);
        formData.append('brdText', updateBoardKindsList.brdText);
        formData.append('showText', updateBoardKindsList.showText);

        Axios.post(`/boardKinds/boardKindsUpdate`, formData)
            .then(res => {
                if (res.data === 'succeed') {
                    setState(state => ({
                        ...state,
                        updateOpen: false
                    }));
    
                    dispatch(getBoardKindsListing(null, props.page, 5));
                    dispatch(getBoardKindsFiltering());
                    dispatch(getBoardKindsPaging(props.page));
                } else {
                    alert('종류코드가 중복 됩니다.');
                }
            })
            .catch(err => {
                throw(err);
            });
    };

    const restoreBoardKinds = (event) => {
        event.preventDefault();
        
        Axios.post(`/boardKinds/boardKindsRestore/${state.brdCode}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    restoreOpen: false
                }));

                dispatch(getBoardKindsListing(null, props.page, 5));
                dispatch(getBoardKindsFiltering());
                dispatch(getBoardKindsPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const handleUpdateChange = (event) => {
        event.persist();
        setUpdateBoardKinds(updateBoardKindsList => ({
            ...updateBoardKindsList,
            [event.target.name]: event.target.value
        }))
    };
    
    return (
        <TableBody className={classes.root}>
            <TableRow>
                <TableCell align='center'>
                    {props.brdCode}
                </TableCell>
                <TableCell align='center'>
                    {props.showText}
                </TableCell>
                <TableCell align='center'>
                    {props.brdText}
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
                        <Button color="secondary" variant="contained" onClick={() => handleClickOpen(props.brdCode)}>
                            삭제
                        </Button>
                        :
                        <Button color="secondary" variant="contained" onClick={() => handleRestoreOpen(props.brdCode)}>
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
                        onClick={deleteBoardKinds}
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
                        onClick={restoreBoardKinds}
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
                            <div className={classes.updateContent}>
                                <h4>게시판코드</h4>
                                <input type="text" defaultValue={updateBoardKindsList.brdCode} name="brdCode"
                                className={classes.updateInput} onChange={handleUpdateChange}></input>
                            </div>
                            <div className={classes.updateContent}>
                                <h4>게시판이름</h4>
                                <input type="text" defaultValue={updateBoardKindsList.showText} name="showText"
                                className={classes.updateInput} onChange={handleUpdateChange}></input>
                            </div>
                            <div className={classes.updateContent}>
                                <h4>게시판경로</h4>
                                <input type="text" defaultValue={updateBoardKindsList.brdText} name="brdText"
                                className={classes.updateInput} onChange={handleUpdateChange}></input>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={updateBoardKinds}
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

export default BoardKindsListTable;