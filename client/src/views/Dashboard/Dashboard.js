/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Grid,
    Button,
    Drawer
} from '@material-ui/core';
import { post } from 'axios';
// import {
//     BoardList
// } from '../BoardList';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    titleArea: {
        width: 'calc(100% - 20px)',
        display: 'inline-block',
        verticalAlign: 'top',
        border: '1px solid rgb(176, 176, 176)',
        borderRadius: 8,
        margin: 10,
        minHeight: 400,
        backgroundColor: 'white'
    },
    title: {
        padding: 'calc(1rem) 0px',
        textAlign: 'center',
        margin: 0,
        color: 'black',
    },
    contentArea: {
        padding: 'calc(1rem)',
        //lineHeight: 24
    },
    content: {
        display: 'flex',
        WebkitBoxAlign: 'center',
        alignItems: 'center',
        height: 'calc(2.5rem)',
        padding: '0px 0.5rem'
    },
    listComment: {
        color: 'crimson',
        textDecoration: 'none',
        transition: 'color 1s ease 0s',
        display: 'inline-block',
        width: '80%',
        height: '100%'
    },
    comment: {
        display: 'flex',
        WebkitBoxAlign: 'center',
        alignItems: 'center',
        width: '80%',
        height: '100%',
        whiteSpace: 'nowrap'
    },
    left: {
        width: '80%',
        float: 'left',
        boxSizing: 'border-box'
    }, 
    right : {
        width: '20%',
        float: 'right',
        boxSizing: "border-box"
    },
    drawer: {
        width: '15%',
        minWidth: 200,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    rightBar: {
        maxHeight: 130
    },
    icon: {
        padding: 10,
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, 0) 100%)',
        height: 130,
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: -1
    },
    blogName: {
        color: '#fff',
        textShadow: '0 2px 4px rgba(0, 0, 0, .9)',
        float: 'right'
    },
    position: {
        bottom: 40,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [notice, setNotice] = useState({
        values: []
    });

    const [open, setOpen] = useState(false);

    const shouldOpen = isDesktop ? true : open;

    useEffect(() => {
        post(`/board/noticeList`)
            .then(res => {
                setNotice(notice => ({
                    ...notice,
                    values: res.data.list
                }));
            })
            .catch(err => {
                throw(err);
            });
    }, []);

    const handleMouseOver = (name, index) => {
        document.querySelectorAll(`div[name=${name}]`)[index].style.backgroundColor = '#f2efe1';
    };

    const handleMouseOut = (name, index) => {
        document.querySelectorAll(`div[name=${name}]`)[index].style.backgroundColor = '';
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                >
                    <Grid
                        item
                        lg={4}
                        sm={8}
                        xl={4}
                        xs={12}
                    >  
                        <div className={classes.titleArea}>
                            <h3 className={classes.title}>공지사항</h3>
                            <div className={classes.contentArea}>
                                {notice.values.map((value, index) => {
                                    return <div className={classes.content} key={index}
                                            name="content"
                                            onMouseOver={() => handleMouseOver("content", index)}
                                            onMouseOut={() => handleMouseOut("content", index)} 
                                        >

                                        <RouterLink 
                                            className={classes.listComment} 
                                            to={{ pathname: `/noticeView/${value.noticeNo}`}}
                                        >
                                            <div className={classes.comment}>
                                                <span>{value.title}</span>
                                            </div>
                                        </RouterLink>
                                    </div>
                                })}
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={8}
                        xl={4}
                        xs={12}
                    >  
                        <div className={classes.titleArea}>
                            <h3 className={classes.title}>자주 보는 글</h3>
                            <div className={classes.contentArea}>
                                {notice.values.map((value, index) => {
                                    return <div className={classes.content} key={index}
                                            name="content2"
                                            onMouseOver={() => handleMouseOver("content2", index)}
                                            onMouseOut={() => handleMouseOut("content2", index)} 
                                        >

                                        <RouterLink 
                                            className={classes.listComment} 
                                            to={{ pathname: `/noticeView/${value.noticeNo}`}}
                                        >
                                            <div className={classes.comment}>
                                                <span>{value.title}</span>
                                            </div>
                                        </RouterLink>
                                    </div>
                                })}
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={8}
                        xl={4}
                        xs={12}
                    ></Grid>
                    <Grid
                        item
                        lg={4}
                        sm={8}
                        xl={4}
                        xs={12}
                    >  
                        <div className={classes.titleArea}>
                            <h3 className={classes.title}>자유게시판</h3>
                            <div className={classes.contentArea}>
                                {notice.values.map((value, index) => {
                                    return <div className={classes.content} key={index}
                                            name="content3"
                                            onMouseOver={() => handleMouseOver("content3", index)}
                                            onMouseOut={() => handleMouseOut("content3", index)} 
                                        >

                                        <RouterLink 
                                            className={classes.listComment} 
                                            to={{ pathname: `/noticeView/${value.noticeNo}`}}
                                        >
                                            <div className={classes.comment}>
                                                <span>{value.title}</span>
                                            </div>
                                        </RouterLink>
                                    </div>
                                })}
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        sm={8}
                        xl={4}
                        xs={12}
                    >  
                        <div className={classes.titleArea}>
                            <h3 className={classes.title}>일지</h3>
                            <div className={classes.contentArea}>
                                {notice.values.map((value, index) => {
                                    return <div className={classes.content} key={index}
                                            name="content4"
                                            onMouseOver={() => handleMouseOver("content4", index)}
                                            onMouseOut={() => handleMouseOut("content4", index)} 
                                        >

                                        <RouterLink 
                                            className={classes.listComment} 
                                            to={{ pathname: `/noticeView/${value.noticeNo}`}}
                                        >
                                            <div className={classes.comment}>
                                                <span>{value.title}</span>
                                            </div>
                                        </RouterLink>
                                    </div>
                                })}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.right}>
                <Drawer
                    anchor="right"
                    classes={{ paper: classes.drawer }}
                    onClose={handleClose}
                    open={shouldOpen}
                    variant={isDesktop ? 'persistent' : 'temporary'}
                >
                    <div className={classes.rightBar}>
                        <div className={classes.position}>
                            <div className={classes.icon}>
                                <RouterLink to="/">
                                    <img src="/images/home.png" width="70px" height="70px"></img>
                                </RouterLink>
                                <RouterLink to="/" className={classes.blogName}>
                                    <h2>Jookbob2 Blog</h2>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </Drawer>
            </div>
        </div>
    );
};

export default Dashboard;