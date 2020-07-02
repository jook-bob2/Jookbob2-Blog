import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import SvgIcon from '@material-ui/core/SvgIcon';
import LockOpenIcon from '@material-ui/icons/LockOpen'; 
import {post} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from '../../../../store/actions/index';

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


function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const Topbar = props => {
    const { className, onSidebarOpen } = props;
    const classes = useStyles();

    const [notifications] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);

    const session = useSelector(state => state.session, []) || [];
    const authenticated = session.authenticated;

    const logout = () => {
        post("/member/logout");
        window.location.reload(true);
    };


    return (
        <AppBar
            className={clsx(classes.root, className)}
            color="secondary"
        >
            <Toolbar>
                <RouterLink to="/">
                    <HomeIcon fontSize="large" color="action"></HomeIcon>
                </RouterLink>
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
                        <RouterLink onClick={logout} to="/#">
                            <IconButton
                                className={classes.signOutButton}
                            >
                                <InputIcon />
                            </IconButton>
                        </RouterLink>
                        :
                        <RouterLink to="/sign-in">
                            <IconButton
                                className={classes.signOutButton}
                            >
                                <LockOpenIcon />
                            </IconButton>
                        </RouterLink>}
                </Hidden>
                <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={onSidebarOpen}
                    >
                        <MenuIcon />
                    </IconButton>
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