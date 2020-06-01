import React, { useState, useEffect } from 'react';
//import Customer from './components/BoardTable'
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

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    minWidth: 1080
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    margin: '18px'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
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
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  }
}));

const BoardList = props => {
  const classes = useStyles();

  const [boardState, setBoardState] = useState({
    customers: '',
    searchKeyword: ''
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    callApi()
      .then(res => {
        setBoardState({
          customers:res,
          searchKeyword: ''
        });
      })
      .catch(err => console.log(err));

    setBoardState(boardState => ({
      ...boardState
    }));
    
    const timer = setInterval(progressCount, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body.data;
  }

  const progressCount = () => {
    setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
  }

  const handleValueChange = (e) => {
    e.persist();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setBoardState(boardState => ({
        ...boardState,
        searchKeyword: e.target.value
    }));
  }

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(boardState.searchKeyword) > -1;
    });
    
    return data.map((c) => {
      return <BoardTable boardState={boardState} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
    });
  }
  
  const cellList = [
    {title:"번호"}, {title:"프로필 이미지"}, {title:"이름"}, {title:"생년월일"}, {title:"성별"}, {title:"직업"}
  ];

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
              {boardState.customers ? filteredComponents(boardState.customers) :
              
              /* boardState.customers.map(c => {
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
