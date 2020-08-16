import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import NoticeFilter from './components/NoticeFilter';
import NoticeListOutput from './components/NoticeListOutput';

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

const NoticeList = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NoticeFilter />
            <NoticeListOutput />
        </div>
    )
};

export default NoticeList;

