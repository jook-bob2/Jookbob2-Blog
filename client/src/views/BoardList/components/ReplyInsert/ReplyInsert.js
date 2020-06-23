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
    TableRow
  } from '@material-ui/core';
import {post} from 'axios';

const styles = makeStyles(theme => ({
    root: {
        
    },
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
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
        padding: '20px 0px 0px 15px',
        borderRight: 'solid 1px lightgray'
    },
    textarea: {
        padding: '20px 20px 0px 20px'
    },
    contentWt: {
        height: 100,
        width: '100%'
    }
}));

const ReplyInsert = props => {
    const classes = styles();
    const { className } = props;

    return (
        <div className={clsx(classes.root, className)}>
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
                        
                        <td colSpan="1"><span>작성자</span></td>
                    </TableRow>
                    <TableRow>
                        <td colSpan="2" className={classes.textarea}>
                            <textarea className={classes.contentWt} placeholder="댓글 쓰기"></textarea>
                        </td>
                    </TableRow>
                </TableBody>
                
            </Table>
        </div>
    );
};

export default ReplyInsert;