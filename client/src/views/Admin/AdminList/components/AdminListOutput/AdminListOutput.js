import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography
  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import AdminListTable from './AdminListTable/AdminListTable';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminListing, getAdminPaging, getAdminFiltering } from 'store/actions/admin/adminList';
import { post } from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 50
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        margin: '18px'
    },
    paper: {
        paddingTop: 10,
        paddingBottom: 10
    },
    progress: {
        margin: 'theme.spacing.unit * 2'
    },
    pagination: {
        padding: 10,
        paddingTop: 20,
    },
    paginationUl: {
        justifyContent: 'center'
    },
    tableHead: {
        fontWeight: 'bold',
        fontSize: 'initial'
    },
    selectWt: {
        width: 150,
        textAlign: 'center',
        fontWeight: 'bold',
        height: 35
    },
    pageDiv: {
        padding: 20,
        marginBottom: 10,
        textAlign: 'right',
        marginRight: '10%'
    },
    selectLable:{
        fontSize: '15pt',
        fontWeight: 'bold'
    }
}));

const AdminListOutput = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const adminList = useSelector(state => state.adminList) || '';
    const filterValues = useSelector(state => state.adminFilter) || '';
    const page = useSelector(state => state.adminListPage.page) || 1;

    const [itemsPerPage, setItemPerPage] = useState(5);
    const [pageOpen, setPageOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [noOfPages, setNoOfPages] = useState(0);
    const [state, setState] = useState({
        secOpen: false,
        restoreOpen: false,
        chkOpen: false
    });

    useEffect(() => {
        if (filterValues === '') {
            dispatch(getAdminListing(false, page, itemsPerPage));
        } else {
            dispatch(getAdminListing(filterValues.values, page, itemsPerPage));
        }
    }, [dispatch, page, filterValues, itemsPerPage]);

    useEffect(() => {
        const timer = setInterval(progressCount, 20);
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setNoOfPages(Math.ceil(adminList.adminCnt / itemsPerPage));
    }, [adminList.adminCnt, itemsPerPage]);

    const progressCount = () => {
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const callbackComponents = (data) => {
        return data.map((c, index) => {
            return <AdminListTable
                key={index} 
                index={index}
                adminNo={c.adminNo} adminId={c.adminId} email={c.email} name={c.name} phoneNo={c.phoneNo} createDt={c.createDt} useYn={c.useYn} secYn={c.secYn}
                page={page} itemsPerPage={itemsPerPage}
            />
        })
    }

    const handlePaging = (e, value) => {
        dispatch(getAdminPaging(value));
        
        if (filterValues === '') {
            dispatch(getAdminListing(false, value, itemsPerPage));
        } else {
            dispatch(getAdminListing(filterValues.values, value, itemsPerPage));
        }
    }

    const handleChange = (event) => {
        event.persist();
        setItemPerPage(event.target.value);
        dispatch(getAdminPaging(page));

        if (filterValues === '') {
            dispatch(getAdminListing(false, page, event.target.value));
        } else {
            dispatch(getAdminListing(filterValues.values, page, event.target.value));
        }
    };

    const handlePageClose = () => {
        setPageOpen(false);
    };

    const handlePageOpen = (event) => {
        event.preventDefault();
        
        setPageOpen(true);
    };

    const handleCheckAll = (event) => {
        const checkAll = event.target.checked;
        if (checkAll) {
            document.querySelectorAll('input[name=childChk]').forEach((item, index) => {
                item.checked = true;
            });
        } else {
            document.querySelectorAll('input[name=childChk]').forEach((item, index) => {
                item.checked = false;
            });
        }
    };

    const handleChkOpen = () => {
        setState(state => ({
            ...state,
            chkOpen: true
        }));
    };

    const handleChkClose = () => {
        setState(state => ({
            ...state,
            chkOpen: false
        }));
    };

    const handleSecOpen = () => {
        const checked = [];
        
        document.querySelectorAll('input[name=childChk]').forEach((item) => {
            checked.push(item.checked);
        });
        
        const checkValue = checked.some((checkValue) => checkValue);

        if (!checkValue) {
            handleChkOpen();
        } else {
            setState(state => ({
                ...state,
                secOpen: true
            }));
        }
    };

    const handleSecClose = () => {
        setState(state => ({
            ...state,
            secOpen: false
        }));
    };

    const handleRestoreOpen = () => {
        const checked = [];
        
        document.querySelectorAll('input[name=childChk]').forEach((item) => {
            checked.push(item.checked);
        });
        
        const checkValue = checked.some((checkValue) => checkValue);

        if (!checkValue) {
            handleChkOpen();
        } else {
            setState(state => ({
                ...state,
                restoreOpen: true
            }));
        }
    };

    const handleRestoreClose = () => {
        setState(state => ({
            ...state,
            restoreOpen: false
        }));
    }

    const secAdminChk = () => {
        const checkArr = [];
        document.querySelectorAll('input[name=childChk]').forEach((item) => {
            if (item.checked) {
                checkArr.push(item.value);
            }
        });

        post(`/admin/adminSecChk`, checkArr)
            .then(res => {
                setState(state => ({
                    ...state,
                    secOpen: false
                }));

                dispatch(getAdminListing(null, page, itemsPerPage));
                dispatch(getAdminFiltering());
                dispatch(getAdminPaging(page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const restoreAdminChk = () => {
        const checkArr = [];
        document.querySelectorAll('input[name=childChk]').forEach((item) => {
            if (item.checked) {
                checkArr.push(item.value);
            }
        });

        post(`/admin/adminRestoreChk`, checkArr)
            .then(res => {
                setState(state => ({
                    ...state,
                    restoreOpen: false
                }));

                dispatch(getAdminListing(null, page, itemsPerPage));
                dispatch(getAdminFiltering());
                dispatch(getAdminPaging(page));
            })
            .catch(err => {
                throw(err);
            });
    };

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <h3 className={classes.paper}>
                    ★ {adminList.adminCnt}명의 관리자가 조회 되었습니다.
                </h3>
                <div className={classes.pageDiv}>
                    <form>
                        <FormControl>
                            <InputLabel id="selectPageLabel" className={classes.selectLable}>페이지 수</InputLabel>
                            <Select
                                labelId="selectPageLabel"
                                className={classes.selectWt}
                                value={itemsPerPage}
                                onChange={handleChange}
                                open={pageOpen}
                                onClose={handlePageClose}
                                onOpen={handlePageOpen}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </div>
            </div>
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHead}><input type="checkbox" name="checkAll" onChange={handleCheckAll}></input></TableCell>
                            <TableCell align="center" className={classes.tableHead}>번호</TableCell>
                            <TableCell align="center" className={classes.tableHead}>아이디</TableCell>
                            <TableCell align="center" className={classes.tableHead}>이메일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>이름</TableCell>
                            <TableCell align="center" className={classes.tableHead}>연락처</TableCell>
                            <TableCell align="center" className={classes.tableHead}>등록일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>사용여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>탈퇴여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>비고</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        adminList.values ? callbackComponents(adminList.values)
                        :
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan="10" align="center">
                                    <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
                
                <div className={classes.pagination}>
                    <div>
                        <Button color="secondary" variant="contained" onClick={handleSecOpen}>선택탈퇴</Button>&nbsp;&nbsp;
                        <Button color="primary" variant="contained" onClick={handleRestoreOpen}>선택복구</Button>
                    </div>
                    <Pagination 
                        classes={{ ul: classes.paginationUl}}
                        color="primary" 
                        shape="rounded" 
                        count={noOfPages}
                        page={page}
                        onChange={handlePaging}
                        defaultPage={1}
                        showFirstButton
                        showLastButton
                    />
                </div>
            </Paper>

            <Dialog
                open={state.chkOpen}
                onClose={handleChkClose}
            >
                <DialogTitle>
                    알림
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택된 관리자가 없습니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleChkClose}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={state.secOpen}
                onClose={handleSecClose}
            >
                <DialogTitle>
                    탈퇴 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 관리자를 탈퇴 시키겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={secAdminChk}
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
                        선택한 관리자를 복구 하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={restoreAdminChk}
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
        </div>
    );
};

export default AdminListOutput;
