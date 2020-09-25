/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import LockOpenIcon from '@material-ui/icons/LockOpen'; 
import {post} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';
import { getViewMember } from 'store/actions/front/viewMember';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        '& > svg': {
            margin: theme.spacing(2),
        }
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
        color: '#FFFFFF'
    }
}));

const Topbar = props => {
    const { className, onSidebarOpen, onSidebarClose, open } = props;
    const classes = useStyles();

    const [notifications] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getViewMember());
    }, [dispatch]);

    const session = useSelector(state => state.session, []) || [];
    const authenticated = session.authenticated;

    const logout = () => {
        post("/member/logout")
            .then(res => {
                dispatch(getViewMember());
                dispatch(getSessioning());
            })
            .catch(err => {
                throw(err);
            });
    };


    return (
        <AppBar
            className={clsx(classes.root, className)}
            color="secondary"
        >
            <Toolbar>
                {/* <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={onSidebarOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden> */}
                <IconButton
                    color="inherit"
                    onClick={open ? onSidebarClose : onSidebarOpen}
                >
                    <MenuIcon />
                </IconButton>
                {/* <RouterLink to="/">
                    <img src="/images/home.png" width="40"></img>
                </RouterLink> */}
                <div className={classes.flexGrow}/>
                <Hidden mdDown>
                    <IconButton color="inherit">
                        <Badge
                            badgeContent={notifications.length}
                            color="primary"
                            variant="dot"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    {authenticated ? 
                        <IconButton
                            className={classes.signOutButton}
                            onClick={logout}
                        >
                            <InputIcon />
                        </IconButton>
                        :
                        <RouterLink to="/sign-in">
                            <IconButton
                                className={classes.signOutButton}
                            >
                                <LockOpenIcon />
                            </IconButton>
                        </RouterLink>}
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default Topbar;