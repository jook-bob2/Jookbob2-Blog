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
import { getAdminListing, getAdminPaging, getAdminFiltering } from 'store/actions/admin/adminList';

const useStyles = makeStyles(theme => ({
    root: {
        
    }
}));

const AdminListTable = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        adminNo: '',
        secOpen: false,
        restoreOpen: false
    });
    
    const handleSecOpen = (adminNo) => {
        setState(state => ({
            ...state,
            adminNo: adminNo,
            secOpen: true
        }));
    };

    const handleSecClose = () => {
        setState(state => ({
            ...state,
            secOpen: false
        }));
    };

    const handleRestoreOpen = (adminNo) => {
        setState(state => ({
            ...state,
            adminNo: adminNo,
            restoreOpen: true
        }));
    }

    const handleRestoreClose = () => {
        setState(state => ({
            ...state,
            restoreOpen: false
        }));
    };

    const secAdmin = (event) => {
        event.preventDefault();
        
        Axios.delete(`/admin/adminSec/${state.adminNo}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    secOpen: false
                }));

                dispatch(getAdminListing(null, props.page, 5));
                dispatch(getAdminFiltering());
                dispatch(getAdminPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const restoreAdmin = (event) => {
        event.preventDefault();
        
        Axios.post(`/admin/adminRestore/${state.adminNo}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    restoreOpen: false
                }));

                dispatch(getAdminListing(null, props.page, 5));
                dispatch(getAdminFiltering());
                dispatch(getAdminPaging(props.page));
            })
            .catch(err => {
                throw(err);
            });
    };

    return (
        <TableBody className={classes.root}>
            <TableRow>
                <TableCell align='center'>
                    <input type="checkbox" name="childChk" value={props.adminNo}></input>
                </TableCell>
                <TableCell align='center'>
                    {((props.page - 1) * props.itemsPerPage) + props.index + 1}
                </TableCell>
                <TableCell align='center'>
                    {props.adminId}
                </TableCell>
                <TableCell align='center'>
                    {props.email}
                </TableCell>
                <TableCell align='center'>
                    {props.name}
                </TableCell>
                <TableCell align='center'>
                    {props.phoneNo}
                </TableCell>
                <TableCell align='center'>
                    {moment(props.createDt).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell align='center'>
                    {props.useYn === 'Y' ? '사용함' : '사용안함'}
                </TableCell>
                <TableCell align='center'>
                    {props.secYn === 'Y' ? '탈퇴함' : '탈퇴안함'}
                </TableCell>
                <TableCell align='center'>
                    <RouterLink
                        to={{ pathname: "/admin-update/" + props.adminId, query: { query: props } }}
                    >
                        <Button color="primary" variant="contained">
                            수정
                        </Button>
                    </RouterLink>&nbsp;&nbsp;
                    {props.secYn !== 'Y' 
                        ?
                        <Button color="secondary" variant="contained" onClick={() => handleSecOpen(props.adminNo)}>
                            탈퇴
                        </Button>
                        :
                        <Button color="secondary" variant="contained" onClick={() => handleRestoreOpen(props.adminNo)}>
                            복구
                        </Button>
                    }
                </TableCell>
            </TableRow>

            <Dialog
                open={state.secOpen}
                onClose={handleSecClose}
            >
                <DialogTitle>
                    탈퇴 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        해당 유저를 탈퇴 시키겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={secAdmin}
                    >
                        탈퇴
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSecClose}
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
                        해당 유저를 복구 시키겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={restoreAdmin}
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

export default AdminListTable;