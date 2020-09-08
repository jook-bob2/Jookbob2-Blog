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
import NoticeTable from './components/NoticeTable';
import Button from '@material-ui/core/Button';
import {post} from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import ContactSupport from '@material-ui/icons/ContactSupport';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';
import { getFrontBoardListing } from 'store/actions/front/boardList';

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
  },
  noticeArea: {
    marginBottom: 20
  }
}));

const BoardList = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { match, history } = props;

  const [brdText] = useState(match.url);

  const boardState = useSelector(state => state.frontBoardList, '') || '';

  const [searchKeyword, setKeyword] = useState('');

  const [noticeState, setNoticeState] = useState({
    values: '',
    count: 0
  });

  const [progress, setProgress] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.count !== undefined ? 5 : 10);
  const [page, setPage] = useState(0);
  
  const callApi = ((page, rowsPerPage) => {
    dispatch(getFrontBoardListing(brdText, page, rowsPerPage));
  });

  useEffect(() => {
    dispatch(getFrontBoardListing(brdText, page, rowsPerPage));
  }, [brdText, dispatch, page, rowsPerPage]);

  const callBackNotice = useCallback(() => {
    const formData = new FormData();
    formData.append('brdText', brdText);
    
    post(`/board/noticeList`, formData)
      .then(res => {
        setNoticeState(noticeState => ({
          ...noticeState,
          values: res.data.list,
          count: res.data.count
        }));
      })
      .catch(err => {
        throw(err);
      })
  }, [brdText]);

  useEffect(() => {
    callBackNotice();
  }, [callBackNotice]);

  useEffect(() => {
    const timer = setInterval(progressCount, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  useEffect(() => {
      dispatch(getSessioning());
  }, [dispatch]);

  const session = useSelector(state => state.session, []) || [];
  const authenticated = session.authenticated;
  const memberNo = session.memberNo;

  const progressCount = () => {
    setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
  }

  const handleValueChange = (e) => {
    e.persist();
    setKeyword(e.target.value);
  };

  const boardComponents = (data) => {
    data = data.filter((c) => {
      return c.title.indexOf(searchKeyword) > -1 || c.writer.indexOf(searchKeyword) > -1 || c.createDt.indexOf(searchKeyword) > -1;
    });
    return data.map((c) => {
      return <BoardTable boardState={boardState} history={history} key={c.bno} bno={c.bno} title={c.title} writer={c.writer} createDt={c.createDt} updateDt={c.updateDt} viewcnt={c.viewcnt} memberNo={memberNo} profileImg={c.profileImg} bKinds={c.bKinds} brdText={c.brdText} />
    });
  };

  const noticeComponents = (data) => {
    return data.map((c) => {
      return <NoticeTable noticeState={noticeState} key={c.noticeNo} noticeNo={c.noticeNo} title={c.title} writer={c.writer} createDt={c.createDt} updateDt={c.updateDt} viewcnt={c.viewcnt} adminNo={c.adminNo} profileImg={c.profileImg} bKinds={c.bKinds} brdText={c.brdText} />;
    });
  };
  
  const handlePageChange = (event, page) => {
    event.preventDefault();

    setPage(Number(page));

    callApi(brdText, rowsPerPage, page);
  };

  const handleRowsPerPageChange = event => {
    event.preventDefault();
    setPage(Number(0));
    setRowsPerPage(Number(event.target.value));

    callApi(brdText, event.target.value, 0);
  };

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        {props.location === undefined 
          ?
          <div><h3><ContactSupport /> Q&A</h3></div>
          :
          <SearchInput
              placeholder="검색하기"
              className={classes.searchInput}
              name="searchKeyword"
              value={boardState.searchKeyword}
              onChange={handleValueChange}
          />
        }
          
          {authenticated ? 
            <div className={classes.menu}>
              {props.count !== undefined ?
                <RouterLink
                  to={ { pathname: "/qna"}}
                >
                  <Button variant="contained" color="primary"><h5>더보기</h5></Button>
                </RouterLink>
                :
                <RouterLink
                  to={ { pathname: "/boardInsert", query: {history: history ,memberNo: memberNo, brdText: brdText, bKinds: boardState.bKinds} }}
                >
                  <Button variant="contained" color="primary"><h5>글쓰기</h5></Button>
                </RouterLink>
              }
            </div>
            :
            null
          }
          
      </div>
      {props.location === undefined
        ?
        null
        :
        <div>
          <Paper className={classes.paper}>
            <Table>
                  {noticeState.values.length > 0 ?  noticeComponents(noticeState.values) :
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan="6" align="center">
                          {noticeState.count !== 0 && progress !== 100
                            ? <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress> 
                            : '데이터가 없습니다.'
                          }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  }
            </Table>
          </Paper>
          <br></br>
        </div>
      }
      
      <Paper className={classes.paper}>
        <Table>
              {boardState.values.length ?  boardComponents(boardState.values) :
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      {boardState.count !== 0 && progress !== 100
                        ? <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress> 
                        : '데이터가 없습니다.'
                      }
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
              count={Number(boardState.count)}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              page={Number(page)}
              rowsPerPage={Number(rowsPerPage)}
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

export default BoardList;
