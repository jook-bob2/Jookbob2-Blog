import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';
import {Avatar, TableBody} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10
    },
    title: {
        width: '90%',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    hidden : {
        display: 'none'
    },
    writer: {
        width: '100%',
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
    },
    avatar: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
    }, 
    mouseOver: {
        backgroundColor: 'red'
    },
    titleColor: {
        color: '#f51664'
    }
}));

const NoticeTable = props => {
    const classes = useStyles();

    return (
        <TableBody>
            <TableRow>
                <td>
                    <h5># {props.noticeNo}</h5>
                </td>
                <td colSpan="4">
                    <h6>{moment(props.createDt).format('YYYY-MM-DD hh:mm:ss')}</h6>
                </td>
                <td></td>
                
            </TableRow>
            <TableRow>
                <TableCell className={classes.title}>
                    {/* RouterLink를 통해 bno를 boardView에 넘겨준다. */}
                    <RouterLink
                        to={{ pathname: `/noticeView/${props.noticeNo}`, query: { brdText: props.brdText, bKinds: props.bKinds } }}
                    >
                        <h4 className={classes.titleColor}>{props.title}</h4>
                    </RouterLink>
                </TableCell>
                <TableCell>
                    <Avatar
                        alt="Person"
                        src={props.profileImg}
                    />
                </TableCell>
                <td className={classes.writer} colSpan="2"><h6>{props.writer}</h6></td>
                <TableCell><h6>{props.viewcnt}</h6></TableCell>
            </TableRow>
        </TableBody>
    );
};

export default NoticeTable;