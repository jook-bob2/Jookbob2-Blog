import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MemberFilter from './components/MemberFilter';
import MemberListOutput from './components/MemberListOutput';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
    paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    },
}));

const MemberList = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MemberFilter />
            <MemberListOutput />
        </div>
    )
};

export default MemberList;

