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
// import Button from '@material-ui/core/Button';
// import {post} from 'axios';

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
    }
}));

const AdminListOutput = props => {
  const classes = useStyles();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(progressCount, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressCount = () => {
    setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
  }

  return (
    <div className={classes.root}>
        <h3 className={classes.paper}>
            x명의 관리자가 조회 되었습니다.
        </h3>
        <Paper className={classes.paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">번호</TableCell>
                        <TableCell align="center">아이디</TableCell>
                        <TableCell align="center">이메일</TableCell>
                        <TableCell align="center">이름</TableCell>
                        <TableCell align="center">폰번호</TableCell>
                        <TableCell align="center">등록일</TableCell>
                        <TableCell align="center">사용여부</TableCell>
                        <TableCell align="center">탈퇴여부</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan="8" align="center">
                            <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
            <div className={classes.pagination}>
                <Pagination 
                    classes={{ ul: classes.paginationUl}}
                    count={10} 
                    color="primary" 
                    shape="rounded"    
                />
            </div>
        </Paper>
    </div>
  );
};

export default AdminListOutput;
