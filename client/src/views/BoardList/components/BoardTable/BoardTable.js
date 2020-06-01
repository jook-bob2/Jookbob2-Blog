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
            <TableCell><a href={props.image}><img src={props.image} alt="profile" width={64}></img></a></TableCell>
            <TableCell>{props.name}</TableCell>
            <TableCell>{moment(props.birthday).format('YYYY/MM/DD')}</TableCell>
            <TableCell>{props.gender}</TableCell>
            <TableCell>{props.job}</TableCell>
        </TableRow>
    );
};

export default BoardTable;