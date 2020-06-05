import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';
import Password from './components/Password';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
          // lg={12}
          // md={12}
          // xl={12}
          // xs={12}
        >
          <AccountProfile authenticated={props.authenticated} memberNo={props.memberNo}/>
        </Grid>
        <Grid
          item
          // lg={8}
          // md={6}
          // xl={8}
          // xs={12}
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <AccountDetails />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <Password authenticated={props.authenticated} memberNo={props.memberNo}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
