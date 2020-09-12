import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import {
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles'
import { SearchInput } from '../../components';
import BoardTable from './components/BoardTable';
import NoticeTable from './components/NoticeTable';
import {post} from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';
import { getFrontBoardListing, getFrontBoardPaging } from 'store/actions/front/boardList';

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
    paddingLeft: 40,
    paddingRight: '2%'
  },
  noticeArea: {
    marginBottom: 20
  },
  pagination: {
    padding: 10,
    paddingTop: 20,
  },
  paginationUl: {
      justifyContent: 'center'
  },
  selectWt: {
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold',
    height: 35
  },
  pageDiv: {
    padding: 20,
  },
  selectLable:{
    fontSize: '15pt',
    fontWeight: 'bold'
  }
}));

const BoardList = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { match, history } = props;
  const [brdText] = useState(match.url);
  const [searchKeyword, setKeyword] = useState('');
  const [noticeState, setNoticeState] = useState({
    values: '',
    count: 0
  });

  const [progress, setProgress] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageOpen, setPageOpen] = useState(false);

  const boardState = useSelector(state => state.frontBoardList, '') || '';
  const page = useSelector(state => state.frontBoardListPage.page) || 1;
  const session = useSelector(state => state.session, []) || [];
  const authenticated = session.authenticated;
  const memberNo = session.memberNo;

  useEffect(() => {
    dispatch(getFrontBoardListing(brdText, page, rowsPerPage));
  }, [brdText, dispatch, page, rowsPerPage]);

  useEffect(() => {
    setNoOfPages(Math.ceil(boardState.count / rowsPerPage));
  }, [boardState.count, rowsPerPage]);

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
    const timer = setInterval(progressCount, 10);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  useEffect(() => {
      dispatch(getSessioning());
  }, [dispatch]);

  const progressCount = () => {
    setProgress(oldProgress => oldProgress + 1);
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

  const handlePaging = (e, pageValue) => {
    e.preventDefault();
    
    dispatch(getFrontBoardPaging(pageValue));
    dispatch(getFrontBoardListing(brdText, pageValue, rowsPerPage));
  }

  const handleChange = (event) => {
    event.persist();
    setRowsPerPage(event.target.value);
    dispatch(getFrontBoardPaging(page));
    dispatch(getFrontBoardListing(brdText, page, event.target.value));
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
        <SearchInput
          placeholder="검색하기"
          className={classes.searchInput}
          name="searchKeyword"
          value={boardState.searchKeyword}
          onChange={handleValueChange}
        />
          
        {authenticated ? 
          <div className={classes.menu}>
            <RouterLink
                to={ { pathname: "/boardInsert", query: {history: history ,memberNo: memberNo, brdText: brdText, bKinds: boardState.bKinds} }}
            >
              <Button variant="contained" color="primary"><h5>글쓰기</h5></Button>
            </RouterLink>
          </div>
          :
          null
        }

      <div className={classes.pageDiv}>
        <form>
          <FormControl variant="outlined">
            <InputLabel id="selectPageLabel" className={classes.selectLable}>페이지 수</InputLabel>
              <Select
                labelId="selectPageLabel"
                className={classes.selectWt}
                value={rowsPerPage}
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

      <div>
        <Paper className={classes.paper}>
          <Table>
                {noticeState.values.length > 0 ? noticeComponents(noticeState.values) :
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan="6" align="center">
                        {progress < 100
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

      <Paper className={classes.paper}>
        <Table>
              {boardState.values.length > 0 ? boardComponents(boardState.values) :
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      {progress < 100
                        ? <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress> 
                        : '데이터가 없습니다.'
                      }
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

export default BoardList;
