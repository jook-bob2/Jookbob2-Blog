import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableRow
  } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import {post} from 'axios';
import moment from 'moment';
import BoardDelete from '../BoardDelete';
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
    bno: {
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

const BoardView = props => {
    const classes = styles();
    const { className, location } = props;

    const [state, setState] = useState({
        bno: location.query !== undefined ? location.query.bno : '',
        memberNo: location.query !== undefined ? location.query.memberNo : '',
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

    const callBackView = useCallback(() => {
        post('/board/boardDetail/' + state.bno).then(res => {
            const list = res.data.list[0];
            setState(state => ({
                ...state,
                title: list.title,
                writer: list.writer,
                writerNo: list.writerNo,
                createDt: list.createDt,
                updateDt: list.updateDt,
                content: list.content,
                showText: list.showText,
                avatar: list.profileImg
            }));
        })
        .catch(err => console.log(err));
    }, [state.bno]);

    useEffect(() => {
        if (state.bno !== '') {
            callBackView();
        }
    }, [callBackView, state.bno]);

    useEffect(() => {
        if (location.query !== undefined && state.bno !== '') {
            
        } else {
            getSession()
                .then(res => {
                    setState(state => ({
                        ...state,
                        bno: res.data.bno,
                        memberNo: res.data.memberNo
                    }));
                })
                .catch(err => console.log(err));
        }
    }, [location.query, state.bno]);

    const getSession = async() => {
        return post('/board/getSession');
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
                                    <td className={classes.bno} colSpan="2"><h5>#{state.bno} {state.showText}</h5></td>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan="2"><h2>{state.title}</h2></TableCell>
                                </TableRow>
                                <TableRow>
                                    <td colSpan='2' className={classes.content2} id="content">{ReactHtmlParser(state.content)}</td>
                                </TableRow>
                            </TableBody> 
                            
                        </Table>
                        <BoardDelete state={state} bno={state.bno} writerNo={state.writerNo} memberNo={state.memberNo} brdText={state.brdText} bKinds={state.bKinds}></BoardDelete>
                    
                </CardContent>
            </Card>
            <Reply bno={state.bno} memberNo={state.memberNo} />
        </div>
    );

};

export default BoardView;