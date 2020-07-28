import React from 'react';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Dashboard = () => {
    const classes = styles();

    return (
        <div className={classes.root}>
            컨텐트
        </div>
    );
};

export default Dashboard;