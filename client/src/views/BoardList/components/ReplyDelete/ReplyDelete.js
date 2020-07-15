import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';
import Axios from 'axios';

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
    nested: {
        paddingLeft: theme.spacing(4),
    },
    selectD: {
        color: '#e83553'
    }
}));

const ITEM_HEIGHT = 48;

const ReplyDelete = (props) => {
    const { className } = props;

    const classes = styles();
    const [state, setState] = useState({
        rcd: props !== undefined ? props.rcd : '',
        open: false
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);

    const session = useSelector(state => state.session, []) || [];
    const memberNo = session.memberNo;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickOpen = () => {
        setState(state => ({
            ...state,
            open: true
        }))
    }

    const handleClose = () => {
        setAnchorEl(null);
        setState(state => ({
            ...state,
            open: false
        }));
    };

    const deleteReply = (event) => {
        event.preventDefault();
        Axios.delete(`/reply/deleteReply/` + state.rcd)
            .then(res => {
                setState(state => ({
                    ...state,
                    open: false
                }));
                props.callBackApi();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={clsx(classes.root, className)}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5
                },
                }}
            >
                {props.replyerNo === memberNo ? 
                    <MenuItem>
                        수정
                    </MenuItem>
                    :
                    null
                }
                {props.replyerNo === memberNo ? 
                    <MenuItem onClick={handleClickOpen} className={classes.selectD}>
                        삭제
                    </MenuItem>
                    :
                    null
                }
            </Menu>
            
            <Dialog
                open={state.open}
                onClose={handleClose}
            >
                <DialogTitle onClose={handleClose}>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        해당 댓글을 삭제 하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.delete}
                        onClick={deleteReply}
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

export default ReplyDelete;