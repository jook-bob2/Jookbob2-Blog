import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar, Footer, TimeLine } from './components';
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
    },
    left: {
        width: 'calc(80% + 100px)',
        float: 'left',
        boxSizing: 'border-box'
    }, 
    right : {
        width: '20%',
        float: 'right',
        boxSizing: "border-box"
    },
}));

const Main = props => {
    const { children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);
    const [openTimeLine, setOpenTimeLine] = useState(false);

    const boardState = useSelector(state => state.frontBoardList, '') || '';
    const boardUse = children.props.boardUse === false ? false : true;

    useEffect(() => {
        if (isDesktop) {
            setOpenSidebar(true);
            setOpenTimeLine(true);
        } else {
            setOpenSidebar(false);
            setOpenTimeLine(false);
        }
    }, [isDesktop]);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const handleTimeLineOpen = () => {
        setOpenTimeLine(true);
    };

    const handleTimeLineClose = () => {
        setOpenTimeLine(false);
    };

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: openSidebar && isDesktop
            })}
        >
            <Topbar 
                sidebarOpen={openSidebar} onSidebarOpen={handleSidebarOpen} onSidebarClose={handleSidebarClose} 
                timelineOpen={openTimeLine} onTimeLineOpen={handleTimeLineOpen} onTimelineClose={handleTimeLineClose}
            />
            <Sidebar 
                onClose={handleSidebarClose}
                open={openSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />
            <main className={classes.content}>
                <div className={classes.left}>
                    {children.props.group !== undefined ?
                        <div className={classes.group}>
                            {boardUse === false ? children.props.group : children.props.group + `(${boardState.count})`}
                        </div>
                        :
                        null
                    }
                    {children}
                </div>
                <div className={classes.right}>
                    <TimeLine 
                        open={openTimeLine} 
                        onClose={handleTimeLineClose}
                        variant={isDesktop ? 'persistent' : 'temporary'}
                    />
                </div>
                <Footer />
            </main>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
