import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MenuFilter from './components/MenuFilter';
import MenuListOutput from './components/MenuListOutput';

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

const MenuList = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MenuFilter />
            <MenuListOutput />
        </div>
    )
};

export default MenuList;

