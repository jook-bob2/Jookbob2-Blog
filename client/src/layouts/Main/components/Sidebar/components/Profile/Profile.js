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

    const [user, setUser] = useState({
        memberNo: props.userId,
        name: '',
        avatar: ''
    });

    useEffect(() => {
        getUser()
            .then(res => {
                const list = res.data.list;
                setUser({
                    ...user,
                    memberNo: list.memberNo,
                    name: list.name,
                    avatar: list.profileImg
                })
            })
    },[]);

    const getUser = () => {
        const url = "/member/viewMember";
        const formData = new FormData();
        formData.append("userId", props.userId);
        return post(url, formData);
    }

    const logout = () => {
        post("/member/logout", null);
        window.location.href="/";
    };

    return (
        <div
            className={clsx(classes.root, className)}
        >
            {props.authenticated ?
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
            {props.authenticated ?
                <Typography
                    className={classes.name}
                    variant="h4"
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
            {props.authenticated ?
                <Typography variant="body2"></Typography>
                :
                <Typography variant="body2">Please Login</Typography>}
            

            {props.authenticated ?
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