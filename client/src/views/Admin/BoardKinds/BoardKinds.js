import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import BoardKindsFilter from './components/BoardKindsFilter';
import BoardKindsListOutput from './components/BoardKindsListOutput';

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

const BoardKinds = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BoardKindsFilter />
            <BoardKindsListOutput />
        </div>
    )
};

export default BoardKinds;

