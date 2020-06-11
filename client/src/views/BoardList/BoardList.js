import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SearchInput } from '../../components';
import BoardTable from './components/BoardTable';
import Button from '@material-ui/core/Button';
import {post} from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px'
    //minWidth: 1080
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    margin: '18px'
  },
  paper: {
    marginLeft: 18,
    marginRight: '10%'
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
    marginRight: theme.spacing(1)
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
    paddingLeft: 40
  }
}));

const BoardList = props => {
  const classes = useStyles();

  const [boardState, setBoardState] = useState({
    values: '',
    searchKeyword: ''
  });

  const [progress, setProgress] = useState(0);

  const [auth, setAuthenticated] = useState({
    authenticated : false,
    memberNo: ''
  });

  useEffect(() => {
    callApi()
      .then(res => {
        setBoardState({
          values:res,
          searchKeyword: ''
        });
      })
      .catch(err => console.log(err));

    setBoardState(boardState => ({
      ...boardState
    }));

    getSession()
      .then(res => {
        console.log(res.data);
        setAuthenticated({
            ...auth,
            authenticated: res.data === -1 ? false : true,
            memberNo: res.data
        });
      });
    
    const timer = setInterval(progressCount, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const callApi = async() => {
    const response = await fetch('/board/boardList');
    const body = await response.json();
    return body.list;
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
      return c.title.indexOf(boardState.searchKeyword) > -1;
    });
    
    return data.map((c) => {
      return <BoardTable boardState={boardState} key={c.bno} bno={c.bno} title={c.title} writer={c.writer} createDt={c.createDt} updateDt={c.updateDt} viewcnt={c.viewcnt} memberNo={auth.memberNo}/>
    });
  }
  
  const cellList = [
    {title:"번호"}, {title:"제목"}, {title:"이름"}, {title:"작성일"}, {title:"수정일"}, {title:"조회수"}
  ];


  const getSession = () => {
    return post('member/session');
  }

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
          {auth.authenticated ? 
            <div className={classes.menu}>
              <RouterLink
                to={ { pathname: "/boardInsert", query: {memberNo: auth.memberNo} }}
              >
                <Button variant="contained" color="primary">글 쓰기</Button>
              </RouterLink>
              
            </div>
            :
            null
          }
          
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map((c) => {
                  return <TableCell className={classes.tableHead} key={c.title.toString()}>{c.title}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              
              {boardState.values ? filteredComponents(boardState.values) :
              
              /* boardState.values.map(c => {
                return (<Customer stateRefresh={boardStateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
              }) :  */
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default BoardList;
