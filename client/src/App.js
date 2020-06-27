import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
//import theme from './theme';
import Routes from './Routes';
import './assets/scss/index.scss';
import validate from 'validate.js';
import validators from './common/validator';
import { createMuiTheme } from '@material-ui/core/styles';
import {post} from 'axios';

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
}

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif'
  }
})

export default function App () {
  const [auth, setAuthenticated] = useState({
    authenticated : false
  });
  
  useEffect(() => {
    getSession()
      .then(res => {
        setAuthenticated({
            authenticated: res.data === -1 ? false : true
        });
      });
  }, [auth.authenticated]);
  
  const getSession = () => {
    return post('member/session', null);
  }
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes authenticated={auth.authenticated} />
      </Router>
    </ThemeProvider>
  );
};
