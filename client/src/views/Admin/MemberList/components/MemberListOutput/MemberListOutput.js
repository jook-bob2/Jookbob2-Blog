import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination';
import MemberListTable from './MemberListTable/MemberListTable';
import { useSelector, useDispatch } from 'react-redux';
import { getMemberListing, getMemberPaging } from 'store/actions/admin/memberList';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 50
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
    }
}));

const MemberListOutput = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const memberList = useSelector(state => state.memberList) || '';
    const filterValues = useSelector(state => state.memberFilter) || '';
    const page = useSelector(state => state.memberListPage.page) || 1;

    const itemsPerPage = 5;
    
    const [progress, setProgress] = useState(0);
    const [noOfPages, setNoOfPages] = useState(0);

    

    useEffect(() => {
        if (filterValues === '') {
            dispatch(getMemberListing(false, page, itemsPerPage));
        } else {
            dispatch(getMemberListing(filterValues.values, page, itemsPerPage));
        }
    }, [dispatch, page, filterValues]);

    useEffect(() => {
        const timer = setInterval(progressCount, 20);
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setNoOfPages(Math.ceil(memberList.userCnt / itemsPerPage));
    }, [memberList.userCnt]);

    const progressCount = () => {
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const callbackComponents = (data) => {
        return data.map((c, index) => {
            return <MemberListTable
                key={index} 
                index={index}
                memberNo={c.memberNo} userId={c.userId} email={c.email} name={c.name} phoneNo={c.phoneNo} createDt={c.createDt} useYn={c.useYn} secYn={c.secYn}
                page={page} itemsPerPage={itemsPerPage}
            />
        })
    }

    const handlePaging = (e, value) => {
        dispatch(getMemberPaging(value));
        
        if (filterValues === '') {
            dispatch(getMemberListing(false, value, itemsPerPage));
        } else {
            dispatch(getMemberListing(filterValues.values, value, itemsPerPage));
        }
    }

    return (
        <div className={classes.root}>
            <h3 className={classes.paper}>
                ★ {memberList.userCnt}명의 회원이 조회 되었습니다.
            </h3>
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                        memberList.values ? callbackComponents(memberList.values)
                        :
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan="9" align="center">
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

export default MemberListOutput;
