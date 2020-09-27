/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
    CardContent,
    Table,
    TableBody,
    TableRow,
    Avatar,
    IconButton,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography,
    Button
} from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import {ThumbUpAlt, ThumbUpOutlined, ThumbDownAlt, ThumbDownOutlined} from '@material-ui/icons';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';

const useStyles = makeStyles(theme => ({
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
        paddingTop: 12
    }
}));

function transform(node, index) {
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

const TimeLineTable = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

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
                                <td colSpan="2" className={classes.contentTr}>{ReactHtmlParser(props.content, options)}</td>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className={classes.repArea}>
                        <Table>
                            <TableBody>
                                <TableRow align='center'>
                                    <td>
                                        <IconButton>
                                            <ThumbUpOutlined />
                                        </IconButton>
                                    </td>
                                    <td>
                                        <IconButton>
                                            <ThumbDownOutlined />
                                        </IconButton>
                                    </td>
                                    <td>
                                        <IconButton onClick={handleOpen}>
                                            <ModeCommentOutlinedIcon />
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
            >
                <DialogTitle>
                    댓글 보기
                </DialogTitle>
                <DialogContent>
                    
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TimeLineTable;