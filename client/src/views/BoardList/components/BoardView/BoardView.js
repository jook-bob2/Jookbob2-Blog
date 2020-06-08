import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Divider
  } from '@material-ui/core';
import {post} from 'axios';
import moment from 'moment';

const styles = makeStyles(theme => ({
    root:{
        margin: '50px',
        marginRight: '40%'
    },
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    avatarTd: {
        padding: '5px',
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
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "21px",
        letterSpacing: "-0.05px",
        verticalAlign: "inherit"
    }
}));

const BoardView = props => {
    const classes = styles();
    const { className, location, ...rest } = props;
    
    const [state, setState] = useState({
        bno: location.query.bno || '',
        title: '',
        writer: '',
        createDt: '',
        updateDt: '',
        content: '',
        avatar: ''
    });

    useEffect(() => {
        callView()
            .then(res => {
                console.log(res);
                const list = res.data.list[0];
                setState({
                    bno: list.bno,
                    title: list.title,
                    writer: list.writer,
                    createDt: list.createDt,
                    updateDt: list.updateDt,
                    content: list.content,
                    avatar: list.profileImg
                })
            })
            .catch(err => console.log(err));
    }, []);

    const bno = location.query.bno;

    const callView = async() => {
        const url = '/board/boardDetail/' + bno;
        const formData = new FormData();
        //formData.append('bno', state.bno);
        return post(url);
    }
    //console.log(location.query.bno);
    

    return (
        <Card
            {...rest}
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
                                /></td>
                                <td colSpan="1"><span>{state.writer}</span><br/><span>{moment(state.createDt).format('YYYY.MM.DD hh:mm:ss')}</span></td>
                            </TableRow>
                            <TableRow>
                                <td className={classes.bno} colSpan="3">#{state.bno}</td>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="3"><h2>{state.title}</h2></TableCell>
                            </TableRow>
                            <TableRow>
                                <td colSpan='3' className={classes.content2}>{state.content}</td>
                            </TableRow>
                        </TableBody> 
                        
                    </Table>
                    
                </div>
            </CardContent>
        </Card>
    );

};

export default BoardView;