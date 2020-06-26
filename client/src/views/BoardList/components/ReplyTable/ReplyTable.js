import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons';
import {
    Avatar, 
    TableBody,
    TableCell,
    TableRow,
    IconButton
} from '@material-ui/core'


const styles = makeStyles(theme => ({
    root: {
        
    },
    avatarTd: {
        padding: '5px 0px 5px 5px'
    },
    avatar: {
        width: 50,
        height: 50
    },
    title: {
        padding: '20px 15px 0px 15px'
    }
}));

const ReplyTable = props => {
    const classes = styles();

    const handleRecUp = () => {

    };

    const handleRecDown = () => {

    };
    
    return (
        <TableBody>
            <TableRow>
                <td colSpan="1" className={classes.avatarTd}>
                    <Avatar
                        alt="Person"
                        className={classes.avatar}
                        src={props.avatar}
                    />
                </td>
                <td colSpan="1"><span>{props.replyer}</span><br/>
                    {props.updateYn === 'Y' ? <h6>{moment(props.createDt).format('YYYY-MM-DD hh:mm:ss')}(작성) ∙ {moment(props.updateDt).format('YYYY-MM-DD hh:mm:ss')}(수정됨)</h6>
                        : <h6>{moment(props.createDt).format('YYYY-MM-DD hh:mm:ss')}(작성)</h6>}
                </td>
            </TableRow>
            <TableRow>
                <td colSpan="2" className={classes.title}>{props.replyText}</td>
            </TableRow>
            <TableRow>
                <TableCell colSpan="2">
                    <IconButton onClick={handleRecUp}>
                        <ArrowDropUp />
                    </IconButton>
                    {props.recCnt}
                    <IconButton onClick={handleRecDown}>
                        <ArrowDropDown />
                    </IconButton>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default ReplyTable;