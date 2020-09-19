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
import NoticeListTable from './NoticeListTable/NoticeListTable';
import { useSelector, useDispatch } from 'react-redux';
import { getNoticeListing, getNoticeFiltering, getNoticePaging } from 'store/actions/admin/noticeList';
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

const NoticeListOutput = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const noticeList = useSelector(state => state.noticeList) || '';
    const filterValues = useSelector(state => state.noticeFilter) || '';
    const page = useSelector(state => state.noticeListPage.page) || 1;

    const [itemsPerPage, setItemPerPage] = useState(5);
    const [pageOpen, setPageOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [noOfPages, setNoOfPages] = useState(0);
    const [state, setState] = useState({
        deleteOpen: false,
        restoreOpen: false
    });

    useEffect(() => {
        if (filterValues === '') {
            dispatch(getNoticeListing(false, page, itemsPerPage));
        } else {
            dispatch(getNoticeListing(filterValues.values, page, itemsPerPage));
        }
    }, [dispatch, page, filterValues, itemsPerPage]);

    useEffect(() => {
        const timer = setInterval(progressCount, 20);
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setNoOfPages(Math.ceil(noticeList.noticeCnt / itemsPerPage));
    }, [itemsPerPage, noticeList.noticeCnt]);

    const progressCount = () => {
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const callbackComponents = (data) => {
        return data.map((c, index) => {
            return <NoticeListTable
                key={index} 
                noticeNo={c.noticeNo} title={c.title} writer={c.writer} createDt={c.createDt} updateDt={c.updateDt} delYn={c.delYn} updateYn={c.updateYn}
                bKindsNo={c.bKindsNo} brdCode={c.brdCode} showText={c.showText}
                page={page} itemsPerPage={itemsPerPage}
            />
        })
    }

    const handlePaging = (e, value) => {
        dispatch(getNoticePaging(value));
        
        if (filterValues === '') {
            dispatch(getNoticeListing(false, value, itemsPerPage));
        } else {
            dispatch(getNoticeListing(filterValues.values, value, itemsPerPage));
        }
    }

    const handleChange = (event) => {
        event.persist();
        setItemPerPage(event.target.value);
        dispatch(getNoticePaging(page));

        if (filterValues === '') {
            dispatch(getNoticeListing(false, page, event.target.value));
        } else {
            dispatch(getNoticeListing(filterValues.values, page, event.target.value));
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

    const handleDeleteOpen = () => {
        setState(state => ({
            ...state,
            deleteOpen: true
        }));
    };

    const handleDeleteClose = () => {
        setState(state => ({
            ...state,
            deleteOpen: false
        }));
    }

    const handleRestoreOpen = () => {
        setState(state => ({
            ...state,
            restoreOpen: true
        }));
    };

    const handleRestoreClose = () => {
        setState(state => ({
            ...state,
            restoreOpen: false
        }));
    }

    const deleteNoticeChk = () => {
        const checkArr = [];
        document.querySelectorAll('input[name=childChk]').forEach((item) => {
            if (item.checked) {
                checkArr.push(item.value);
            }
        });

        post(`/notice/noticeDeleteChk`, checkArr)
            .then(res => {
                setState(state => ({
                    ...state,
                    deleteOpen: false
                }));

                dispatch(getNoticeListing(null, page, itemsPerPage));
                dispatch(getNoticeFiltering());
                dispatch(getNoticePaging(page));
            })
            .catch(err => {
                throw(err);
            });
    };

    const restoreNoticeChk = () => {
        const checkArr = [];
        document.querySelectorAll('input[name=childChk]').forEach((item) => {
            if (item.checked) {
                checkArr.push(item.value);
            }
        });

        post(`/notice/noticeRestoreChk`, checkArr)
            .then(res => {
                setState(state => ({
                    ...state,
                    restoreOpen: false
                }));

                dispatch(getNoticeListing(null, page, itemsPerPage));
                dispatch(getNoticeFiltering());
                dispatch(getNoticePaging(page));
            })
            .catch(err => {
                throw(err);
            });
    };

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <h3 className={classes.paper}>
                    ★ {noticeList.noticeCnt}개의 게시물이 조회 되었습니다.
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
                            <TableCell align="center" className={classes.tableHead}>글번호</TableCell>
                            <TableCell align="center" className={classes.tableHead}>글제목</TableCell>
                            <TableCell align="center" className={classes.tableHead}>글작성자</TableCell>
                            <TableCell align="center" className={classes.tableHead}>공지사항 유형</TableCell>
                            <TableCell align="center" className={classes.tableHead}>등록일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>수정일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>수정여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>삭제여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>비고</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        noticeList.values ? callbackComponents(noticeList.values)
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
                        <Button color="secondary" variant="contained" onClick={handleDeleteOpen}>선택삭제</Button>&nbsp;&nbsp;
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
                open={state.deleteOpen}
                onClose={handleDeleteClose}
            >
                <DialogTitle>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 게시물을 삭제 하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteNoticeChk}
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
                        선택한 유저를 복구 시키겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={restoreNoticeChk}
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

export default NoticeListOutput;
