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
    IconButton
  } from '@material-ui/core';
import {post} from 'axios';
import ReplyInsert from '../ReplyInsert';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';

const styles = makeStyles(theme => ({
    root: {
        margin: '50px',
        marginRight: '10%'
    },
    content: {
        padding: 0
    },
    avatarTd: {
        padding: '5px 0px 5px 5px'
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
    },
    writer: {
        borderRight: 'solid 1px lightgray',
    },
    title: {
        padding: '20px 15px 0px 15px'
        //borderRight: 'solid 1px lightgray'
    }
}));

const Reply = props => {
    const classes = styles();
    const { className } = props;

    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <div >
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
                                        //src={state.avatar}
                                    />
                                </td>
                                <td colSpan="1"><span>작성자</span><br/>
                                    <h6>2020.06.22(작성) ∙ 2020.06.22(수정됨)</h6>
                                </td>
                            </TableRow>
                            <TableRow>
                                <td colSpan="2" className={classes.title}>댓글 내용</td>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="2">
                                    <IconButton>
                                        <ArrowDropUp />
                                    </IconButton>
                                    0
                                    <IconButton>
                                        <ArrowDropDown />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    
                </div>
            </CardContent>
            <CardContent className={classes.content}>
                <ReplyInsert />
            </CardContent>
        </Card>
    );
};

export default Reply;