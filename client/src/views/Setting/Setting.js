import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Account } from './components';
import {post} from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Setting = () => {
  const classes = useStyles();

  const [auth, setAuthenticated] = useState({
    authenticated : false,
    memberNo : null,
  });

  const getSession = () => {
      return post('member/session', null);
  }

  useEffect(() => {
      getSession()
          .then(res => {
            console.log("setting : " + res.data);
          setAuthenticated({
              authenticated: res.data === -1 ? false : true,
              memberNo: res.data
          });
      });
  },[]);

  return (
    <div className={classes.root}>
    
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <Account authenticated={auth.authenticated} memberNo={auth.memberNo}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Setting;
