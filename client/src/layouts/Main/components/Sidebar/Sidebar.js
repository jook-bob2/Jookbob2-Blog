import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Profile, SidebarNav } from './components';
import { post } from 'axios';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexDirection: 'column',
        heigth: '100%',
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    },
    logout: {
        color: '#37474f'
    }
}));

const Sidebar = props => {
    const { open, variant, onClose, className } = props;

    const classes = useStyles();

    const [menuState, setMenuState] = useState({
        menu: [],
        subMenu: []
    });

    useEffect(() => {
        post('/ftmenu/menuList')
            .then(res => {
                const menuList = res.data.menuList;
                const menuArr = [];
                const subArr = [];

                for (let menu of menuList) {
                    if (menu.upperMenuCd) {
                        subArr.push(menu);
                    } else {
                        menuArr.push(menu);
                    }
                }
                
                setMenuState({
                    menu: menuArr,
                    subMenu: subArr
                });
            })
            .catch(err => {
                throw(err);
            })
    }, []);
    
    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div
                className={clsx(classes.root, className)}
            >
                <Profile />
                <Divider className={classes.divider} />
                
                <SidebarNav
                    className={classes.nav}
                    menuList={menuState}
                />
            </div>
        </Drawer>
    );
}

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
};

export default Sidebar;