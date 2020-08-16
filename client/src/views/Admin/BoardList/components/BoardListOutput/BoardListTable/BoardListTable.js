import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import { getBoardListing, getBoardFiltering, getBoardPaging } from 'store/actions/admin/boardList';

const useStyles = makeStyles(theme => ({
    root: {
        
    }
}));

const BoardListTable = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        bno: '',
        deleteOpen: false,
        restoreOpen: false
    });


    const handleClickOpen = (bno) => {
        setState(state => ({
            ...state,
            bno: bno,
            deleteOpen: true
        }));
    };

    const handleDeleteClose = () => {
        setState(state => ({
            ...state,
            deleteOpen: false
        }));
    };

    const handleRestoreOpen = (bno) => {
        setState(state => ({
            ...state,
            bno: bno,
            restoreOpen: true
        }));
    }

    const handleRestoreClose = () => {
        setState(state => ({
            ...state,
            restoreOpen: false
        }));
    };

    const deleteBoard = (event) => {
        event.preventDefault();
        
        Axios.delete(`/boardManagement/boardDelete/${state.bno}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    deleteOpen: false
                }));

                dispatch(getBoardListing(null, props.page, 5));
                dispatch(getBoardFiltering());
                dispatch(getBoardPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const restoreBoard = (event) => {
        event.preventDefault();
        
        Axios.post(`/boardManagement/boardRestore/${state.bno}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    restoreOpen: false
                }));

                dispatch(getBoardListing(null, props.page, 5));
                dispatch(getBoardFiltering());
                dispatch(getBoardPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    return (
        <TableBody className={classes.root}>
            <TableRow>
                <TableCell align='center'>
                    {props.bno}
                </TableCell>
                <TableCell align='center'>
                    {props.title}
                </TableCell>
                <TableCell align='center'>
                    {props.writer}
                </TableCell>
                <TableCell align='center'>
                    {props.showText}
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
                    <RouterLink
                        to={{ pathname: "/board-update/" + props.bno, query: { query: props } }}
                    >
                        <Button color="primary" variant="contained">
                            수정
                        </Button>
                    </RouterLink>
                    &nbsp;&nbsp;
                    {props.delYn !== 'Y' 
                        ?
                        <Button color="secondary" variant="contained" onClick={() => handleClickOpen(props.bno)}>
                            삭제
                        </Button>
                        :
                        <Button color="secondary" variant="contained" onClick={() => handleRestoreOpen(props.bno)}>
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
                        onClick={deleteBoard}
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
                        color="secondary"
                        className={classes.delete}
                        onClick={restoreBoard}
                    >
                        복구
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRestoreClose}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </TableBody>
    );
};

export default BoardListTable;