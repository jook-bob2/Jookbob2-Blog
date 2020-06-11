import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography
} from '@material-ui/core';

const styles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        marginTop: 50
    },
    delete: {
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#e83553'
    },
    goList: {
        marginRight: 10,
        marginLeft: 10
    }
}));

const BoardDelete = (props) => {
    const classes = styles();

    const [state, setState] = useState({
        bno: props !== undefined ? props.bno : '',
        memberNo: props !== undefined ? props.memberNo : '',
        open: false
    });

    const handleClickOpen = () => {
        setState(state => ({
            ...state,
            open: true
        }))
    }

    const handleClose = () => {
        setState(state => ({
            ...state,
            open: false
        }));
    };

    const deleteBoard = () => {
        const url = '/board/deleteBoard/' + state.bno;
        fetch(url, {
            method: 'DELETE'
        })
            .then(window.location.href = '/boardList')
            .catch(err => console.log(err));
    };

    const goList = () => {
        window.location.href = '/boardList';
    };

    return (
        <div className={classes.root}>
            {props.writerNo === props.memberNo ? 
                <Button 
                variant="contained"
                color="secondary"
                className={classes.delete}
                onClick={handleClickOpen}
                >
                    삭제
                </Button>
                :
                null
            }

            <Button 
                variant="contained"
                color="primary"
                className={classes.goList}
                onClick={goList}
            >
                목록
            </Button>
            
            <Dialog
                open={state.open}
                onClose={handleClose}
            >
                <DialogTitle onClose={handleClose}>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        해당 게시물을 삭제 하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.delete}
                        onClick={deleteBoard}
                    >
                        삭제
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        //className={classes.delete}
                        onClick={handleClose}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BoardDelete;