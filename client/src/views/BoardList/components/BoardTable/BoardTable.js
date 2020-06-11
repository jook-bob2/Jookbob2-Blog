import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';

import {post} from 'axios';

const useStyles = makeStyles(theme => ({
    title: {
        width: '30%',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    hidden : {
        display: 'none'
    }
}));

const BoardTable = props => {
    const classes = useStyles();

    const setSession = () => {
        const url = "/board/setSession/" + props.bno;
        return post(url);
    }

    return (
        <TableRow>
            <TableCell>{props.bno}</TableCell>
            <TableCell className={classes.title}>
                {/* RouterLink를 통해 bno를 detail에 넘겨준다. */}
                <RouterLink
                    to={{ pathname: "/boardView", query: {bno: props.bno, memberNo: props.memberNo} }}
                    onClick={setSession}
                >
                    {props.title}
                </RouterLink>
            </TableCell>
            <TableCell>{props.writer}</TableCell>
            <TableCell>{moment(props.createDt).format('YYYY/MM/DD')}</TableCell>
            <TableCell>{moment(props.updateDt).format('YYYY/MM/DD')}</TableCell>
            <TableCell>{props.viewcnt}</TableCell>
        </TableRow>
        
    );
};

export default BoardTable;