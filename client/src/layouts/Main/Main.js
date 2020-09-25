import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar, Footer } from './components';
import { useSelector } from 'react-redux';

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
    },
    group: {
        padding: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 'xx-large',
        marginRight: '10%'
    }
}));

const Main = props => {
    const { children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(true);

    const boardState = useSelector(state => state.frontBoardList, '') || '';

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    //const shouldOpenSidebar = isDesktop ? true : openSidebar;

    const handleBoardWhether = () => {
        if (!children.props.boardUse) {
            return children.props.group;
        } else {
            return children.props.group + `(${boardState.count})`;
        }
    }

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: openSidebar
            })}
        >
            <Topbar open={openSidebar} onSidebarOpen={handleSidebarOpen} onSidebarClose={handleSidebarClose} />
            <div></div>
            <Sidebar 
                onClose={handleSidebarClose}
                open={openSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main className={classes.content}>
                {children.props.group ?
                    <div className={classes.group}>
                        {children.props.group !== undefined ? handleBoardWhether() : ''}
                    </div>
                    : null
                }
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
