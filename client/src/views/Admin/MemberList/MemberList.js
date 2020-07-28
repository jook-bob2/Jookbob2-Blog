import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    
  }
}));

const MemberList = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      MemberList
    </div>
  );
};

export default MemberList;
