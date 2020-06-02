import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography,  Button } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import {post} from 'axios';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen'; 

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
        marginTop: theme.spacing(1)
    },
    iconBtn: {
        marginTop: 8
    }
}));

const Profile = props => {
    const { className, ...rest } = props;

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

    const logout = () => {
        post("/member/logout", null);
        window.location.reload(true);
    };

    const user = {
        name: 'Sana',
        avatar: 'https://mybucket7009.s3.ap-northeast-2.amazonaws.com/upload/2020/05/17/4cf66713-f7fb-4130-838a-8e47135c9ccc_sana.jpg',
        bio: 'Singer'
    };

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Avatar
                alt="Person"
                className={classes.avatar}
                component={RouterLink}
                src={user.avatar}
                to="/settings"
            />
            <Typography
                className={classes.name}
                variant="h4"
            >
                {user.name}
            </Typography>
            <Typography variant="body2">{user.bio}</Typography>

            {auth.authenticated ?
            <div className={classes.iconBtn}>
                <RouterLink onClick={logout} to="/#">
                    <Button><InputIcon /></Button>
                </RouterLink>
                <RouterLink to="/#">
                    <Button><SettingsIcon /></Button>
                </RouterLink>
            </div>
            :
            <div className={classes.iconBtn}>
                <RouterLink to="/sign-in">
                    <Button><LockOpenIcon /></Button>
                </RouterLink>
                <RouterLink to="/#">
                    <Button><SettingsIcon /></Button>
                </RouterLink>
            </div>}
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;