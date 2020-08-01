import React from 'react';
//import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';
//import {post} from 'axios';
import {TableCell, TableRow, TableBody} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        
    }
}));

const AdminListTable = props => {
    const classes = useStyles();

    return (
        <TableBody className={classes.root}>
            <TableRow>
                <TableCell align='center'>
                    {((props.page - 1) * props.itemsPerPage) + props.index + 1}
                </TableCell>
                <TableCell align='center'>
                    {props.adminId}
                </TableCell>
                <TableCell align='center'>
                    {props.email}
                </TableCell>
                <TableCell align='center'>
                    {props.name}
                </TableCell>
                <TableCell align='center'>
                    {props.phoneNo}
                </TableCell>
                <TableCell align='center'>
                    {moment(props.createDt).format('YYYY-MM-DD HH:mm:ss')}
                </TableCell>
                <TableCell align='center'>
                    {props.useYn === 'Y' ? '사용함' : '사용안함'}
                </TableCell>
                <TableCell align='center'>
                    {props.secYn === 'Y' ? '탈퇴함' : '탈퇴안함'}
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default AdminListTable;