import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import BoardKindsListTable from './BoardKindsListTable/BoardKindsListTable';
import { useSelector, useDispatch } from 'react-redux';
import { getBoardKindsListing, getBoardKindsPaging } from 'store/actions/admin/boardKindsList';
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
    MenuItem
} from '@material-ui/core';

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
    createContent: {
        padding: 20
    },
    createInput: {
        width: '100%',
        height: 21,
        backgroundColor: 'ivory',
        border: '1px solid skyblue',
        fontFamily: 'initial',
        fontSize: '10pt',
        color: 'red',
        textAlign: 'center',
    },
    createDiv: {
        width: '100%',
        height: 325,
        border: '1px solid #000'
    },
    left: {
        width: '50%',
        float: 'left',
        boxSizing: 'border-box'
    }, 
    right : {
        width: '50%',
        float: 'right',
        boxSizing: "border-box"
    },
    createSelect: {
        width: '100%',
        border: '1px solid skyblue',
        height: 25,
        backgroundColor: 'ivory',
        color: 'red'
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

const BoardKindsListOutput = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const boardKindsList = useSelector(state => state.boardKindsList) || '';
    const filterValues = useSelector(state => state.boardKindsFilter) || '';
    const page = useSelector(state => state.boardKindsListPage.page) || 1;

    const [itemsPerPage, setItemPerPage] = useState(5);
    const [pageOpen, setPageOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [noOfPages, setNoOfPages] = useState(0);

    useEffect(() => {
        if (filterValues === '') {
            dispatch(getBoardKindsListing(false, page, itemsPerPage));
        } else {
            dispatch(getBoardKindsListing(filterValues.values, page, itemsPerPage));
        }
    }, [dispatch, page, filterValues, itemsPerPage]);

    useEffect(() => {
        const timer = setInterval(progressCount, 20);
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setNoOfPages(Math.ceil(boardKindsList.boardKindsCnt / itemsPerPage));
    }, [itemsPerPage, boardKindsList.boardKindsCnt]);

    const progressCount = () => {
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const callbackComponents = (data) => {
        return data.map((c, index) => {
            return <BoardKindsListTable
                key={index} 
                bKindsNo={c.bKindsNo} brdCode={c.brdCode} brdText={c.brdText} showText={c.showText}
                createDt={c.createDt} updateDt={c.updateDt} delYn={c.delYn} updateYn={c.updateYn}
                page={page} itemsPerPage={itemsPerPage}
            />
        })
    }

    const handlePaging = (e, value) => {
        dispatch(getBoardKindsPaging(value));
        
        if (filterValues === '') {
            dispatch(getBoardKindsListing(false, value, itemsPerPage));
        } else {
            dispatch(getBoardKindsListing(filterValues.values, value, itemsPerPage));
        }
    }

    const handleChange = (event) => {
        event.persist();
        setItemPerPage(event.target.value);
        dispatch(getBoardKindsPaging(page));

        if (filterValues === '') {
            dispatch(getBoardKindsListing(false, page, event.target.value));
        } else {
            dispatch(getBoardKindsListing(filterValues.values, page, event.target.value));
        }
    };

    const handlePageClose = () => {
        setPageOpen(false);
    };

    const handlePageOpen = (event) => {
        event.preventDefault();
        
        setPageOpen(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <h3 className={classes.paper}>
                    ★ {boardKindsList.boardKindsCnt}개의 아이템이 조회 되었습니다.
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
                            <TableCell align="center" className={classes.tableHead}>종류코드</TableCell>
                            <TableCell align="center" className={classes.tableHead}>게시판이름</TableCell>
                            <TableCell align="center" className={classes.tableHead}>게시판경로</TableCell>
                            <TableCell align="center" className={classes.tableHead}>등록일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>수정일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>수정여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>삭제여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>비고</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        boardKindsList.values ? callbackComponents(boardKindsList.values)
                        :
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan="8" align="center">
                                    <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
                
                <div className={classes.pagination}>
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
        </div>
    );
};

export default BoardKindsListOutput;
