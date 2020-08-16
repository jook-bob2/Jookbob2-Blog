import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import BoardFilter from './components/BoardFilter';
import BoardListOutput from './components/BoardListOutput';

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

const BoardList = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BoardFilter />
            <BoardListOutput />
        </div>
    )
};

export default BoardList;

