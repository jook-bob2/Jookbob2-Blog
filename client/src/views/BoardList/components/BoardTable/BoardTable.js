import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';

/* const useStyles = makeStyles(theme => ({
    title: {
        width: '30%',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
})); */

const BoardTable = props => {
    //const classes = useStyles();
    return (
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell>{props.title}</TableCell>
            <TableCell>{props.writer}</TableCell>
            <TableCell>{moment(props.createDt).format('YYYY/MM/DD')}</TableCell>
            <TableCell>{moment(props.updateDt).format('YYYY/MM/DD')}</TableCell>
            <TableCell>{props.viewcnt}</TableCell>
        </TableRow>
    );
};

export default BoardTable;