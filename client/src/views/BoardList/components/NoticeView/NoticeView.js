import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
        padding: 0
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
    }
}));

const ITEM_HEIGHT = 48;

const NoticeView = props => {
    const classes = styles();
    const { className, location, match, history } = props;

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

    useEffect(() => {
        post('/board/noticeDetail/' + state.noticeNo).then(res => {
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
    }, [state.noticeNo]);

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
                                <td colSpan='2' className={classes.content2} id="content">{ReactHtmlParser(state.content)}</td>
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