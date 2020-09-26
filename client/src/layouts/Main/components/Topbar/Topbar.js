/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
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
        color: '#FFFFFF'
    }
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 15,
      border: '1px solid rgb(176, 176, 176)'
    },
}))(Tooltip);

const Topbar = props => {
    const { className, onSidebarOpen, onSidebarClose, sidebarOpen, timelineOpen, onTimeLineOpen, onTimelineClose } = props;
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
                <LightTooltip title="메뉴 On/Off">
                    <IconButton
                        color="inherit"
                        onClick={sidebarOpen ? onSidebarClose : onSidebarOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </LightTooltip>

                <div className={classes.flexGrow}/>
 
                <LightTooltip title="알림">
                    <IconButton color="inherit">
                        <Badge
                            badgeContent={notifications.length}
                            color="primary"
                            variant="dot"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </LightTooltip>
                {authenticated ? 
                    <LightTooltip title="로그아웃">
                        <IconButton
                            className={classes.signOutButton}
                            onClick={logout}
                        >
                            <InputIcon />
                        </IconButton>
                    </LightTooltip>
                    :
                    <LightTooltip title="로그인">
                        <RouterLink to="/sign-in">
                            <IconButton
                                className={classes.signOutButton}
                            >
                                <LockOpenIcon />
                            </IconButton>
                        </RouterLink>
                    </LightTooltip>
                }

                <LightTooltip title="타임라인 On/Off">
                    <IconButton
                        color="inherit"
                        onClick={timelineOpen ? onTimelineClose : onTimeLineOpen}
                    >
                        <AlarmOnIcon />
                    </IconButton>
                </LightTooltip>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default Topbar;