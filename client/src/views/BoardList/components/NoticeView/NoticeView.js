import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import {
    Card,
    CardContent,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableRow,
    IconButton,
    Menu,
    MenuItem
  } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ReactHtmlParser from 'react-html-parser';
import {post} from 'axios';
import moment from 'moment';
import Reply from '../Reply';

const styles = makeStyles(theme => ({
    root:{
        margin: '50px',
        marginRight: '10%'
    },
    content: {
        padding: 0,
        overflow: 'auto'
    },
    inner: {
        minWidth: 1050
    },
    avatarTd: {
        padding: '5px 0px 5px 5px',
        borderBottom: '1px solid #eeeeee'
    },
    content2: {
        padding: '15px',
        paddingTop: '35px'
    },
    avatar: {
        width: 50,
        height: 50
    },
    noticeNo: {
        paddingTop: "16px",
        paddingLeft: "16px",
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "21px",
        letterSpacing: "-0.05px",
        verticalAlign: "inherit",
        color: "#1886C4"
    },
    deskTopCode: {
        fontSize: '0.8rem',
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

const ITEM_HEIGHT = 48;

const NoticeView = props => {
    const classes = styles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });
    const { className, location, match, history } = props;

    const options = {
        decodeEntities: true,
        transform
    };

    function transform(node, index) {
        if (node.type === "tag" && node.name === "img") {
            const img = node.attribs.src;
            if (isDesktop) {
                return (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                        key={index}
                        src={img}
                        width="850px"
                    >
                    </img>
                )
            } else {
                return (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                        key={index}
                        src={img}
                        width="380px"
                    >
                    </img>
                )
            }
        }

        if (node.type === "tag" && node.name === "code") {
            const data = node.children[0].data;

            if (isDesktop) {
                return (
                    <div className={classes.deskTopCode} key={index}>
                        {data}
                    </div>
                );
            } else {
                return (
                    <div className={classes.mobileCode} key={index}>
                        {data}
                    </div>
                );
            }
        }

        if (node.type === "tag" && node.name === "oembed") {
            const vCode = node.attribs.url.split("v=")[1];
            const url = `https://www.youtube.com/embed/${vCode}`;
    
            if (isDesktop) {
                return (
                    // eslint-disable-next-line jsx-a11y/iframe-has-title
                    <iframe
                        key={index}
                        src={url} width="720" height="380" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                );
            } else {
                return (
                    // eslint-disable-next-line jsx-a11y/iframe-has-title
                    <iframe
                        key={index}
                        src={url} width="360" height="180" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                );
            }
        }
    }

    const [state, setState] = useState({
        noticeNo: match.params.noticeNo,
        brdText: location.query !== undefined ? location.query.brdText : '',
        bKinds: location.query !== undefined ? location.query.bKinds : '',
        title: '',
        writer: '',
        writerNo: '',
        createDt: '',
        updateDt: '',
        content: '',
        avatar: '',
        showText: ''
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const callBackView = useCallback(() => {
        post('/board/noticeDetail/' + match.params.noticeNo).then(res => {
            const list = res.data.list[0];
            setState(state => ({
                ...state,
                noticeNo: list.noticeNo,
                title: list.title,
                brdText: list.brdText,
                bKinds: list.bKinds,
                writer: list.writer,
                writerNo: list.writerNo,
                createDt: list.createDt,
                updateDt: list.updateDt,
                content: list.content,
                showText: list.showText,
                avatar: list.profileImg
            }));
        })
        .catch(err => {
            throw(err);
        });
    }, [match.params.noticeNo])

    useEffect(() => {
        if (state.noticeNo !== '') callBackView();
    }, [callBackView, state.noticeNo]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setState(state => ({
            ...state,
            open: false
        }));
    };

    const goList = () => {
        history.push(`${state.brdText}`);
    };

    return (
        <div>
            <Card
                className={clsx(classes.root, className)}
            >
                
                <CardContent className={classes.content}>
                    
                    <Table>
                        <colgroup>
                            <col width="2%"/>
                            <col width="60%"/>
                            <col width="38%"/>
                        </colgroup>
                        <TableBody>
                            <TableRow>
                                <td colSpan="1" className={classes.avatarTd}>
                                    <Avatar
                                        alt="Person"
                                        className={classes.avatar}
                                        src={state.avatar}
                                        //component={RouterLink}
                                        //src=""
                                        //to="/setting"
                                    />
                                </td>
                                <td colSpan="1"><span>{state.writer}</span><br/>
                                    {state.createDt !== '' ?  <span><h6>{moment(state.createDt).format('YYYY.MM.DD hh:mm:ss')}</h6></span> : '' }
                                </td>
                            </TableRow>
                            <TableRow>
                                <td className={classes.noticeNo} colSpan="2"><h5>#{state.noticeNo} {state.showText}</h5></td>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="2"><h2>{state.title}</h2></TableCell>
                            </TableRow>
                            <TableRow>
                                <td colSpan='2' className={classes.content2} id="content">{ReactHtmlParser(state.content, options)}</td>
                            </TableRow>
                        </TableBody> 
                        
                    </Table>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5
                        },
                        }}
                    >
                        <MenuItem onClick={goList}>
                            목록
                        </MenuItem>
                    </Menu>
                </CardContent>
            </Card>
            <Reply noticeNo={state.noticeNo} />
        </div>
    );

};

export default NoticeView;