import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SearchInput } from '../../components';
import BoardTable from './components/BoardTable';
import Button from '@material-ui/core/Button';
import {post} from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 25
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    margin: '18px'
  },
  paper: {
    marginLeft: 18,
    marginRight: '10%',
    padding: 10
  },

  progress: {
    margin: 'theme.spacing.unit * 2'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  searchInput: {
    marginRight: theme.spacing(4)
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    // marginTop: 15,
    // marginBottom: 15,
    // display: 'flex',
    // justifyContent: 'center'
    paddingLeft: 40,
    paddingRight: '6%'
  },
  pagination: {
    padding: 10,
    paddingTop: 20,
    fontSize: 'xx-small'
  }
}));

const AboutJob = props => {
  const classes = useStyles();

  const [boardState, setBoardState] = useState({
    values: '',
    searchKeyword: '',
    count: 0,
    brdText: props.location === undefined ? 'aboutJob' : props.location.pathname.split("/")[1],
    bKinds: '01'
  });

  const [progress, setProgress] = useState(0);

  const [auth, setAuthenticated] = useState({
    authenticated : false,
    memberNo: ''
  });

  const [rowsPerPage, setRowsPerPage] = useState(props.count !== undefined ? 5 : 10);
  const [page, setPage] = useState(0);

  const callBackApi = useCallback(() => {
    const url = '/board/boardList';
    const formData = new FormData();
    formData.append('brdText', boardState.brdText);
    formData.append('page', page);
    formData.append('rowsPerPage', rowsPerPage);
    post(url, formData).then(res => {
      setBoardState(boardState => ({
        ...boardState,
        values:res.data.list,
        searchKeyword: '',
        count: res.data.count
      }));
    })
    .catch(err => console.log(err));;
  }, [boardState.brdText, page, rowsPerPage]);

  useEffect(() => {
    callBackApi();

    const timer = setInterval(progressCount, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, [callBackApi]);

  useEffect(() => {
    getSession()
    .then(res => {
      setAuthenticated(auth => ({
          ...auth,
          authenticated: res.data === -1 ? false : true,
          memberNo: res.data
      }));
    })
    .catch(err => console.log(err));
  }, []);

  const callApi = (rowPerPageNo, pageNo) => {
    // const response = await fetch('/board/boardList');
    // const body = await response.json();
    // return body.list;
    const url = '/board/boardList';
    const formData = new FormData();
    formData.append('brdText', boardState.brdText);
    formData.append('page', pageNo !== undefined ? pageNo : page);
    formData.append('rowsPerPage', (rowPerPageNo !== undefined && rowPerPageNo !== null) ? rowPerPageNo : rowsPerPage);
    return post(url, formData);
  }

  const progressCount = () => {
    setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
  }

  const handleValueChange = (e) => {
    e.persist();
    setBoardState(boardState => ({
        ...boardState,
        searchKeyword: e.target.value
    }));
  }

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.title.indexOf(boardState.searchKeyword) > -1 || c.writer.indexOf(boardState.searchKeyword) > -1 || c.createDt.indexOf(boardState.searchKeyword) > -1;
    });
    return data.map((c) => {
      return <BoardTable boardState={boardState} key={c.bno} bno={c.bno} title={c.title} writer={c.writer} createDt={c.createDt} updateDt={c.updateDt} viewcnt={c.viewcnt} memberNo={auth.memberNo} profileImg={c.profileImg} bKinds={c.bKinds} />
    });
  }
  
  const handlePageChange = (event, page) => {
    event.preventDefault();
    setPage(parseInt(page, 10));

    callApi(rowsPerPage, page)
      .then(res => {
        setBoardState({
          ...boardState,
          values:res.data.list,
          searchKeyword: '',
          count: res.data.count
        });
      })
      .catch(err => console.log(err));
  };

  const handleRowsPerPageChange = event => {
    event.preventDefault();
    setPage(parseInt(0, 10));
    setRowsPerPage(parseInt(event.target.value, 10));

    callApi(event.target.value, 0)
      .then(res => {
        setBoardState({
          ...boardState,
          values:res.data.list,
          searchKeyword: '',
          count: res.data.count
        });
      })
      .catch(err => console.log(err));
  };

  const getSession = () => {
    return post("member/session");
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        {props.location === undefined 
            ?
            <div><h3><AccountBalanceIcon /> 취업관련</h3></div>
            :
            <SearchInput
                placeholder="검색하기"
                className={classes.searchInput}
                name="searchKeyword"
                value={boardState.searchKeyword}
                onChange={handleValueChange}
            />
        }
        {auth.authenticated ? 
          <div className={classes.menu}>
            {props.count !== undefined ?
              <RouterLink
                to={ { pathname: "/aboutJob"}}
              >
                <Button variant="contained" color="primary"><h5>더보기</h5></Button>
              </RouterLink>
              :
              <RouterLink
                to={ { pathname: "/boardInsert", query: {memberNo: auth.memberNo, brdText: boardState.brdText, bKinds: boardState.bKinds} }}
              >
                <Button variant="contained" color="primary"><h5>글쓰기</h5></Button>
              </RouterLink>
            }
          </div>
          :
          null
        }
          
      </div>
      <Paper className={classes.paper}>
        <Table>
              {boardState.values ?  filteredComponents(boardState.values) :
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress>
                    </TableCell>
                  </TableRow>
                </TableBody>
              }
        </Table>
        <div className={classes.pagination}>
          {props.count !== undefined
            ?
            null
            :
            <TablePagination
              component="div"
              count={parseInt(boardState.count, 10)}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              page={parseInt(page, 10)}
              rowsPerPage={parseInt(rowsPerPage, 10)}
              rowsPerPageOptions={[5, 10, 25]}
              color="secondary"
              shape="round"
              labelRowsPerPage="건수"
            />
          }
        </div>
      </Paper>
    </div>
  );
};

export default AboutJob;
