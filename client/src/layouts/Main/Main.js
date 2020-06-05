import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar, Footer } from './components';
import {post} from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 240
    },
    content: {
        height: '100%'
    }
}));

const Main = props => {
    const { children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [auth, setAuthenticated] = useState({
        authenticated : false,
        memberNo: ''
    });

    useEffect(() => {
        getSession()
          .then(res => {
            setAuthenticated({
                authenticated: res.data === -1 ? false : true,
                memberNo: res.data
            });
          });
    }, []);

    const getSession = () => {
        return post('member/session', null);
    }

    const [openSidebar, setOpenSidebar] = useState(false);
    

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop
            })}
        >
            <Topbar onSidebarOpen={handleSidebarOpen} authenticated={auth.authenticated} memberNo={auth.memberNo}/>
            <Sidebar 
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
                authenticated={auth.authenticated}
                memberNo={auth.memberNo}
            />
            <main className={classes.content}>
                {children}
                <Footer />
            </main>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
