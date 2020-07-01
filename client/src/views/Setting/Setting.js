import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Account } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Setting = () => {
  const classes = useStyles();

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
          <Account />
        </Grid>
      </Grid>
    </div>
  );
};

export default Setting;
