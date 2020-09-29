/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { 
    CardContent,
    Table,
    TableBody,
    TableRow,
    Avatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ReactHtmlParser from 'react-html-parser';
import { Link as RouterLink } from 'react-router-dom';
import {ThumbUpAlt, ThumbUpOutlined, ThumbDownAlt, ThumbDownOutlined} from '@material-ui/icons';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import Reply from 'views/BoardList/components/Reply';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: 'white',
    },
    contentTr: {
        padding: '15px 5px 0px 5px'
    },
    agoTime: {
        color: '#90949c'
    },
    writer: {
        fontWeight: 600
    },
    contentColor: {
        lineHeight: 1.358,
        marginBottom: 2,
        borderBottom: '2px solid #4b4f56',
        backgroundColor: 'white',
        overflow: 'auto'
    },
    contentFont: {
        fontSize: 12,
        lineHeight: '24px'
    },
    repArea: {
        paddingTop: 6
    },
    dlgTitle: {
        backgroundColor: '#f50057',
        color: 'white',
        textShadow: '0 2px 4px rgba(0, 0, 0, .9)'
    },
    mobileCode: {
        fontSize: '0.4rem',
        background: '#eee',
        border: '0 solid #3d7e9a',
        color: '#333',
        marginTop: 0,
        marginBottom: 20,
        padding: 15,
        position: 'relative',
        fontFamily: 'consolas,monaco,"Andale Mono",monospace',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.5,
        overflow: 'auto',
        direction: 'ltr!important',
        textAlign: 'left!important',
        borderLeftWidth: '5px!important',
        borderRightWidth: '0!important',
        tabSize: 4,
        hyphens: 'none',
    }
}));

const TimeLineTable = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [content, setContent] = useState('');

    function transform(node, index) {
        if (node.type === "tag" && node.name === "code") {
            const data = node.children[0].data;
            return (
                <div className={classes.mobileCode} key={index}>
                    {data}
                </div>
            );
        }
    
        if (node.type === "tag" && node.name === "oembed") {
            const vCode = node.attribs.url.split("v=")[1];
            const url = `https://www.youtube.com/embed/${vCode}`
            return (
                // eslint-disable-next-line jsx-a11y/iframe-has-title
                <iframe
                    key={index}
                    src={url} width="120" height="60" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
                </iframe>
            );
        }
    }
    
    const options = {
        decodeEntities: true,
        transform
    };

    useEffect(() => {
        if (props.content.length >= 100) {
            const contentValue = props.content.substring(0, 100) + '...';
            setContent(contentValue);
        }
    }, [props.content]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.contentColor}>
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
                                <td colSpan="2"><h4>#{props.showText}</h4></td>
                            </TableRow>
                            <TableRow>
                                <td colSpan="1">
                                    <Avatar
                                        alt="Person"
                                        src={props.avatar}
                                    />
                                </td>
                                <td colSpan="1">
                                    <span className={classes.writer}>{props.name}</span><br/>
                                    <span className={classes.agoTime}>{props.agoTime}</span>
                                </td>
                            </TableRow>
                            <TableRow>
                                <td colSpan="2" className={classes.contentTr}>
                                    {ReactHtmlParser(content, options)}
                                </td>
                            </TableRow>
                            <TableRow>
                                <td colSpan="2" className={classes.contentTr}>
                                    {
                                        props.noticeNo !== undefined ?
                                            <RouterLink to={`/noticeView/${props.noticeNo}`}>
                                                자세히보기
                                            </RouterLink>
                                        :
                                            <RouterLink to={`/boardView/${props.bno}`}>
                                                자세히보기
                                            </RouterLink>
                                    }
                                </td>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className={classes.repArea}>
                        <Table>
                            <TableBody>
                                <TableRow align='center'>
                                    {/* <td>
                                        <IconButton style={{ fontSize: 12 }}>
                                            <ThumbUpOutlined style={{ fontSize: 12 }}/> 좋아요
                                        </IconButton>
                                    </td> */}
                                    <td>
                                        <IconButton style={{ fontSize: 15 }} onClick={handleOpen}>
                                            <ModeCommentOutlinedIcon style={{ fontSize: 15 }} /> 댓글 달기
                                        </IconButton>
                                    </td>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </span>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                {/* <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton> */}
                <DialogTitle className={classes.dlgTitle}>
                    댓글 보기
                    <IconButton onClick={handleClose} className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {
                        props.bno !== undefined ?
                            <Reply bno={props.bno} />
                        :
                            <Reply noticeNo={props.noticeNo} />
                    }
                </DialogContent>
                {/* <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        닫기
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
};

export default TimeLineTable;