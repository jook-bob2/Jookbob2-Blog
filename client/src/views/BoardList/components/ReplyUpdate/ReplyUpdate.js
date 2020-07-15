import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent
} from '@material-ui/core';
import {post} from 'axios';

const styles = makeStyles(theme => ({
    root: {
        
    },
    delete: {
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#e83553'
    },
    goList: {
        marginRight: 10,
        marginLeft: 10
    },
    updateBtn: {
        color: 'blue'
    },
    contentWt: {
        height: 100,
        width: '100%'
    }
}));

const ReplyUpdate = (props) => {
    const classes = styles();
    const [state, setState] = useState({
        rcd: props !== undefined ? props.rcd : '',
        replyText: '',
        open: props !== undefined ? props.open : false
    });

    useEffect(() => {
        post(`/reply/getReplyForm/` + state.rcd)
            .then(res => {
                setState(state => ({
                    ...state,
                    replyText: res.data.replyText
                }));
            })
            .catch(err => {
                throw(err);
            });
    }, [state.rcd]);

    const handleChange = (event) => {
        event.preventDefault();
        
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
        
    };

    const updateReply = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('replyText', state.replyText);
        formData.append('rcd', state.rcd);
        post(`/reply/updateReply/`, formData)
            .then(res => {
                props.handleUpdateClose();
                props.callBackApi();
            })
            .catch(err => console.log(err));
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.handleUpdateClose}
            fullWidth={true}
        >
            <DialogTitle 
                onClose={props.handleUpdateClose}
            >
                수정
            </DialogTitle>
            <DialogContent>
                <textarea className={classes.contentWt} placeholder="댓글 쓰기" value={state.replyText} name="replyText" onChange={handleChange}></textarea>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={updateReply}
                >
                    등록
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.delete}
                    onClick={props.handleUpdateClose}
                >
                    닫기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReplyUpdate;