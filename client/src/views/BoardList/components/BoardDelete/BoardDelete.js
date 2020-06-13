import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const styles = makeStyles(theme => ({
    root: {
        //textAlign: 'center',
        paddingLeft: 5,
        paddingTop: 50
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

const BoardDelete = (props) => {
    const { className } = props;

    const classes = styles();

    const [state, setState] = useState({
        bno: props !== undefined ? props.bno : '',
        memberNo: props !== undefined ? props.memberNo : '',
        open: false
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

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
                {props.writerNo === props.memberNo ? 
                    <RouterLink to={{ pathname: "/boardUpdate", query: {state: props.state, bno: props.bno, memberNo: props.memberNo} }}>
                        <MenuItem>
                            수정
                        </MenuItem>
                    </RouterLink>
                    
                    :
                    null
                }
                {props.writerNo === props.memberNo ? 
                    <MenuItem onClick={handleClickOpen} className={classes.selectD}>
                        삭제
                    </MenuItem>
                    :
                    null
                }
                <MenuItem onClick={goList}>
                    목록
                </MenuItem>
                
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