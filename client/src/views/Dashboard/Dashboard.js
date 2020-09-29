/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Grid
} from '@material-ui/core';
import { post } from 'axios';

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
}));

const Dashboard = () => {
    const classes = useStyles();

    const [notice, setNotice] = useState({
        values: []
    });

    const [popular, setPopular] = useState({
        values: []
    });

    const [free, setFree] = useState({
        values: []
    });

    const [journal, setJournal] = useState({
        values: []
    });


    useEffect(() => {
        post(`/board/dashboardList`)
            .then(res => {
                setNotice(notice => ({
                    ...notice,
                    values: res.data.noticeList
                }));
                setPopular(popular => ({
                    ...popular,
                    values: res.data.popularList
                }));
                setFree(free => ({
                    ...free,
                    values: res.data.freeList
                }));
                setJournal(journal => ({
                    ...journal,
                    values: res.data.journalList
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

    return (
        <div className={classes.root}>
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
                        <h3 className={classes.title}>인기 있는 글</h3>
                        <div className={classes.contentArea}>
                            {popular.values.map((value, index) => {
                                return <div className={classes.content} key={index}
                                        name="content2"
                                        onMouseOver={() => handleMouseOver("content2", index)}
                                        onMouseOut={() => handleMouseOut("content2", index)} 
                                    >

                                    <RouterLink 
                                        className={classes.listComment} 
                                        to={{ pathname: `/boardView/${value.bno}`}}
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
                            {free.values.map((value, index) => {
                                return <div className={classes.content} key={index}
                                        name="content3"
                                        onMouseOver={() => handleMouseOver("content3", index)}
                                        onMouseOut={() => handleMouseOut("content3", index)} 
                                    >

                                    <RouterLink 
                                        className={classes.listComment} 
                                        to={{ pathname: `/boardView/${value.bno}`}}
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
                            {journal.values.map((value, index) => {
                                return <div className={classes.content} key={index}
                                        name="content4"
                                        onMouseOver={() => handleMouseOver("content4", index)}
                                        onMouseOut={() => handleMouseOut("content4", index)} 
                                    >

                                    <RouterLink 
                                        className={classes.listComment} 
                                        to={{ pathname: `/boardView/${value.bno}`}}
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
    );
};

export default Dashboard;