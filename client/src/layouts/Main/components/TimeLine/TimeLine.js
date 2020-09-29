/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Drawer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    CardContent,
    CircularProgress
} from '@material-ui/core';
import TimeLineTable from './components/TimeLineTable';
import { post } from 'axios';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '16%',
        minWidth: 350,
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
    },
    blogName: {
        color: '#fff',
        textShadow: '0 2px 4px rgba(0, 0, 0, .9)',
        float: 'right',
        marginRight: 80
    },
    position: {
        bottom: 40,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1,
        overflow: 'hidden'
    },
    timeLineList: {
        paddingTop: 120,
    },
    title: {
        borderBottom: '4px solid #4267b2',
        color: '#444950',
        fontWeight: 'bold',
    },
    titleArea: {
        fontSize: 15,
        lineHeight: '40px',
        textAlign: 'center',
        borderBottomColor: 'white'
    },
    contentArea: {
        height: '100%',
        position: 'relative',
        width: '100%'
    },
    contentOver: {
        overflowY: 'auto',
        position: 'relative',
        width: '100%',
        maxHeight: 675
    },
    contentPadding: {
        padding: 20,
        backgroundColor: '#f2f4f7'
    },
    contentColor: {
        lineHeight: 1.358,
        marginBottom: 2,
        borderBottom: '2px solid #4b4f56',
        backgroundColor: 'white'
    },
    contentFont: {
        fontSize: 12,
        lineHeight: '24px'
    },
    searchArea: {
        lineHeight: 1.358,
        marginBottom: 2,
        borderBottom: '2px solid #4b4f56',
        backgroundColor: 'white',
        textAlign: 'center'
    }
}));

const rowsPerPage = 5;

const TimeLine = (props) => {
    const { open, onClose, variant } = props;
    const classes = useStyles();

    const [timelineState, setTimelineState] = useState({
        values: []
    });
    const [progress, setProgress] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [noData, setNoData] = useState(false);
    let searchData = false;
    let page = 1;

    useEffect(() => {
        const timer = setInterval(progressCount, 100);
        
        return () => {
          clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(scrollProgressCount, 100);
        
        return () => {
          clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        timelineCallback();
        window.addEventListener('scroll', infiniteScroll, true);
        return () => window.removeEventListener('scroll', infiniteScroll, true);
    // eslint-disable-next-line no-use-before-define
    }, [infiniteScroll, timelineCallback]);

    const timelineCallback = useCallback(() => {
        const formData = new FormData();
        formData.append('page', page);
        formData.append('rowsPerPage', rowsPerPage);

        if (searchData === false) {
            post(`/board/timelineList`, formData)
                .then(res => {
                    if (res.data.list.length === 0) {
                        page--;
                        setNoData(true);
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                        searchData = true;
                        setScrollProgress(0);
                    } else {
                        const dateSortAfterList = res.data.list.sort((a, b) => {
                            return new Date(b.createDt) - new Date(a.createDt);
                        });
        
                        setTimelineState(state => ({
                            ...state,
                            values: state.values.concat(dateSortAfterList)
                        }));
                    }
                })
                .catch(err => {
                    throw(err);
                });
        }
    }, [noData, page]);

    const infiniteScroll = useCallback(() => {
        let element = document.getElementById('contentOver');
        let scrollHeight = Math.max(element.scrollHeight, element.scrollHeight);
        let scrollTop = Math.max(element.scrollTop, element.scrollTop);
        let clientHeight = element.clientHeight;
        const { innerHeight } = window;
        console.log(scrollHeight, scrollTop, clientHeight, innerHeight);

        if (scrollTop + clientHeight === scrollHeight) {
            page++;
            timelineCallback();
        }
    }, [page, timelineCallback]);

    const progressCount = () => {
        setProgress(oldProgress => oldProgress + 1);
    };

    const scrollProgressCount = () => {
        setScrollProgress(oldProgress => oldProgress + 1);
    };

    const timeLineTable = (data) => {
        return data.map((c, index) => {
            return <TimeLineTable 
                key={index} noticeNo={c.noticeNo} bno={c.bno}
                agoTime={c.agoTime} showText={c.showText}
                name={c.name} avatar={c.profileImg} content={c.content}
            />
        });
    }

    return (
        <Drawer
            anchor="right"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div className={classes.rightBar}>
                <div className={classes.position}>
                    <div className={classes.icon}>
                        <RouterLink to="/">
                            <img src="/images/home.png" width="70px" height="70px"></img>
                        </RouterLink>
                        <RouterLink to="/" className={classes.blogName}>
                            <h2>죽밥이 블로그</h2>
                        </RouterLink>
                    </div>
                    <div className={classes.timeLineList}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan="1" align="center" className={classes.titleArea}>
                                        <div className={classes.title}>
                                            타임라인
                                        </div>
                                    </TableCell>                                
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className={classes.contentArea}>
                            <div className={classes.contentOver} id='contentOver'>
                                <div className={classes.contentPadding}>
                                    {timelineState.values.length > 0 ? timeLineTable(timelineState.values)
                                        : <div className={classes.contentColor}>
                                            <span className={classes.contentFont}>
                                                <CardContent>
                                                    <Table>
                                                        <colgroup>
                                                            <col width="8%"/>
                                                            <col width="45%"/>
                                                            <col width="47%"/>
                                                        </colgroup>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell colSpan="6" align="center">
                                                                    {progress < 100
                                                                        ? <CircularProgress color="secondary" size="1rem" variant="determinate" value={progress}></CircularProgress> 
                                                                        : '데이터가 없습니다.'
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </CardContent>
                                            </span>
                                        </div>
                                    }
                                    <div className={classes.searchArea}>
                                        <span className={classes.contentFont}>
                                            {noData === true
                                                ? '더이상 데이터가 없습니다.'
                                                : <CircularProgress color="secondary" size="1rem" variant="determinate" value={scrollProgress}></CircularProgress> 
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>    
                        </div>   
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default TimeLine;