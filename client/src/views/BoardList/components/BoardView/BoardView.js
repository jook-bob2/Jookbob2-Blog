import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TablePagination
  } from '@material-ui/core';
import {post} from 'axios';
import moment from 'moment';
import BoardDelete from '../BoardDelete';

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
    const { className, location, history, ...rest } = props;
    
    const [state, setState] = useState({
        bno: location.query !== undefined ? location.query.bno : '',
        memberNo: location.query !== undefined ? location.query.memberNo : '',
        title: '',
        writer: '',
        writerNo: '',
        createDt: '',
        updateDt: '',
        content: '',
        avatar: '',
        showText: ''
    });
    
    useEffect(() => {
        if (location.query !== undefined && state.bno !== '') {
            
        } else {
            getSession()
                .then(res => {
                    setState({
                        ...state,
                        bno: res.data
                    })
                });
        }

        callView()
            .then(res => {
                const list = res.data.list[0];
                setState({
                    ...state,
                    bno: list.bno,
                    title: list.title,
                    writer: list.writer,
                    writerNo: list.writerNo,
                    createDt: list.createDt,
                    updateDt: list.updateDt,
                    content: list.content,
                    showText: list.showText,
                    avatar: list.profileImg
                })
            })
            .catch(err => console.log(err));
    }, [state.bno]);
    
    const callView = async() => {
        const url = '/board/boardDetail/' + state.bno;
        const formData = new FormData();
        //formData.append('bno', state.bno);
        return post(url);
    };
    //console.log(location.query.bno);
    
    const getSession = () => {
        const url = "/board/getSession";
        return post(url);
    };

    return (
        <Card
            //{...rest}
            className={clsx(classes.root, className)}
        >
            
            <CardContent className={classes.content}>
                <div className={classes.inner}>
                    <Table>
                        <colgroup>
                            <col width="5%"/>
                            <col width="50%"/>
                            <col width="10%"/>
                            <col width="35%"/>
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
                                    {state.createDt !== '' ?  <span>{moment(state.createDt).format('YYYY.MM.DD hh:mm:ss')}</span> : '' }
                                </td>
                            </TableRow>
                            <TableRow>
                                <td className={classes.bno} colSpan="3">#{state.bno} {state.showText}</td>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><h2>{state.title}</h2></TableCell>
                            </TableRow>
                            <TableRow>
                                <td colSpan='3' className={classes.content2}>{state.content}</td>
                            </TableRow>
                        </TableBody> 
                        
                    </Table>
                    <BoardDelete bno={state.bno} writerNo={state.writerNo} memberNo={state.memberNo}></BoardDelete>
                </div>
            </CardContent>
        </Card>
    );

};

export default BoardView;