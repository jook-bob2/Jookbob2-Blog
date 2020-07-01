import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography,  Button } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import {post} from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen'; 
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from '../../../../../../store/actions/index';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    avatar: {
        width: 60,
        height: 60
    },
    name: {
        marginTop: theme.spacing(1),
        fontWeight: 'bold'
    },
    iconBtn: {
        marginTop: 8
    }
}));

const Profile = props => {
    const { className } = props;

    const classes = useStyles();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);

    const session = useSelector(state => state.session, []) || [];
    const authenticated = session.authenticated;

    const [user, setUser] = useState({
        name: '',
        avatar: ''
    });

    const callBackUser = useCallback(() => {
        const url = "/member/viewMember";
        const formData = new FormData();

        post(url, formData).then(res => {
            const message = res.data.message;
            if (message === "succeed") {
                const list = res.data.list;
                setUser(user => ({
                    ...user,
                    name: list.name,
                    avatar: list.profileImg
                }))
            }
        });
    }, []);

    useEffect(() => {
        callBackUser();
    }, [callBackUser]);

    const logout = () => {
        post("/member/logout");
        window.location.href="/";
    };

    return (
        <div
            className={clsx(classes.root, className)}
        >
            {authenticated ?
            <Avatar
                alt="Person"
                className={classes.avatar}
                component={RouterLink}
                src={user.avatar}
                to="/setting"
            /> 
            : 
            <Avatar
                alt="Person"
                className={classes.avatar}
                
            /> }
            {authenticated ?
                <Typography
                    className={classes.name}
                    variant="h6"
                >
                    {user.name}
                </Typography>
                :
                <Typography
                    className={classes.name}
                    variant="h4"
                >
                
                </Typography>
            }
            {authenticated ?
                <Typography variant="body2"></Typography>
                :
                <Typography variant="h6" className={classes.name}>Please Login</Typography>}
            

            {authenticated ?
                <div className={classes.iconBtn}>
                    <RouterLink onClick={logout} to="/#">
                        <Button><InputIcon /></Button>
                    </RouterLink>
                    <RouterLink to="/setting">
                        <Button><SettingsIcon /></Button>
                    </RouterLink>
                </div>
                :
                <div className={classes.iconBtn}>
                    <RouterLink to="/sign-in">
                        <Button><LockOpenIcon /></Button>
                    </RouterLink>
                </div>}
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;