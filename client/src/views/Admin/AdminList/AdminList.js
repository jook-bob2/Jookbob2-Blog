import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AdminFilter from './components/AdminFilter';
import AdminListOutput from './components/AdminListOutput';

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

const AdminList = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AdminFilter />
            <AdminListOutput />
        </div>
    )
};

export default AdminList;

