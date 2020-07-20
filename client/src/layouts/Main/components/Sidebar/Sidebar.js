import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import { Profile, SidebarNav } from './components';
import {
    List,
    AccountBalance,
    Category,
    ContactSupport,
    Dashboard
} from '@material-ui/icons';

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

    const pages = {
        menu: [
            {
                title: 'Home',
                href: '/dashboard',
                icon: <Dashboard />,
                haveSub: 'N'
            },
            {
                title: '게시판',
                icon: <List />,
                haveSub: 'Y'
            },
            {
                title: '게시판2',
                icon: <List />,
                haveSub: 'Y'
            }
        ],
        subMenu: [
            {
                title: 'Q&A',
                href: '/qna',
                icon: <ContactSupport />,
                subTitle: '게시판'
            },
            {
                title: '취업관련',
                href: '/aboutJob',
                icon: <AccountBalance />,
                subTitle: '게시판'
            },
            {
                title: '일상관련',
                href: '/talkLife',
                icon: <Category />,
                subTitle: '게시판'
            },
            {
                title: '123',
                href: '/error',
                icon: <ContactSupport />,
                subTitle: '게시판2'
            },
            {
                title: '435',
                href: '/error',
                icon: <AccountBalance />,
                subTitle: '게시판2'
            },
            {
                title: '353',
                href: '/error',
                icon: <Category />,
                subTitle: '게시판2'
            }
        ]
    };
    
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
                    pages={pages}
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