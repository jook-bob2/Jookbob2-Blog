/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
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
    },
    timeLineList: {
        paddingTop: 150,
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
        maxHeight: 706
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
}));

const TimeLine = (props) => {
    const { open, onClose, variant } = props;
    const classes = useStyles();

    const [timelineState, setTimelineState] = useState({
        values: []
    });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(progressCount, 10);
        
        return () => {
          clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        post(`/board/timelineList`)
            .then(res => {
                const dateSortAfterList = res.data.list.sort((a, b) => {
                    return new Date(b.createDt) - new Date(a.createDt);
                });

                setTimelineState(state => ({
                    ...state,
                    values: dateSortAfterList
                }));
            })
            .catch(err => {
                throw(err);
            });
    }, []);

    const progressCount = () => {
        setProgress(oldProgress => oldProgress + 1);
    };

    const timeLineTable = (data) => {
        return data.map((c, index) => {
            return <TimeLineTable 
                key={index} agoTime={c.agoTime} showText={c.showText}
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
                            <h2>Jookbob2 Blog</h2>
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
                            <div className={classes.contentOver}>
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
                                                                        ? <CircularProgress variant="determinate" value={progress}></CircularProgress> 
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