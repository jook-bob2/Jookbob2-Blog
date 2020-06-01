import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
/* import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';*/
//import LockOpenIcon from '@material-ui/icons/LockOpen'; 
import { Profile, SidebarNav } from './components';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputIcon from '@material-ui/icons/Input'; 
import {post} from 'axios';

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
    const { open, variant, onClose, className, ...rest } = props;

    const classes = useStyles();

    const [auth, setAuthenticated] = useState({
        authenticated : true
    });

    useEffect(() => {
        getSession()
          .then(res => {
            setAuthenticated({
                authenticated: res.data === "" ? false : true
            });
          });
    }, []);

    const getSession = () => {
        return post('member/session', null);
    }


    const authPages = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon />
        },
        {
            title: '게시판',
            href: '/boardList',
            icon: <DashboardIcon />
        },
        {
            title: '로그아웃',
            href: '/sign-in',
            icon: <InputIcon className={classes.logout}/>
        }
    ];

    const notAuthPages = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon />
        },
        {
            title: '게시판',
            href: '/boardList',
            icon: <DashboardIcon />
        },
        {
            title: '로그인',
            href: '/sign-in',
            icon: <LockOpenIcon />
        }
    ];
    
    

    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div
                {...rest}
                className={clsx(classes.root, className)}
            >
                <Profile />
                <Divider className={classes.divider} />
                {auth.authenticated ? 
                    <SidebarNav
                        className={classes.nav}
                        pages={authPages}
                    />
                    :
                    <SidebarNav
                        className={classes.nav}
                        pages={notAuthPages}
                    />
                }
                
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