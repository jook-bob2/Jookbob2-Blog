import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment';
import {
    Avatar, 
    TableBody,
    TableCell,
    TableRow,
    IconButton
} from '@material-ui/core'
import {ThumbUpAlt, ThumbUpOutlined, ThumbDownAlt, ThumbDownOutlined} from '@material-ui/icons';
import {post} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getSessioning } from 'store/actions';
import ReplyDelete from '../ReplyDelete';


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
    },
    setting: {
        textAlign: 'right',
        paddingRight: 5
    }
}));

const ReplyTable = props => {
    const classes = styles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSessioning());
    }, [dispatch]);

    const session = useSelector(state => state.session, []) || [];
    const memberNo = session.memberNo;
    
    const [ state, setState ] = useState({
        likeYn: 'N',
        hateYn: 'N',
        likeCnt: props.likeCnt !== undefined ? props.likeCnt : 0,
        hateCnt: props.hateCnt !== undefined ? props.hateCnt : 0
    });

    useEffect(() => {
        try {
            const formData = new FormData();
            formData.append('rcd', props.rcd);
            post('/reply/confirmRecom', formData)
                .then(res => {
                    const data = res.data;
                    setState(state => ({
                        ...state,
                        likeYn: data.likeMember === memberNo && data.likeYn === 'Y' ? 'Y' : 'N',
                        hateYn: data.hateMember === memberNo && data.hateYn === 'Y' ? 'Y' : 'N'
                    }))
                })
                .catch(err => {
                    throw(err);
                });
        } catch (error) {
            throw(error);
        }
        
    }, [props.rcd, memberNo]);

    const handleRecomLike = (event) => {
        event.preventDefault();
        if (memberNo === -1) {
            alert("로그인 후 이용해주세요.");
            return false;
        }
        if (props.replyerNo === memberNo) {
            alert("댓글 작성자는 추천할 수 없습니다.");
            return false;
        }
        if (state.likeYn === 'Y') {
            updateRecom('LIKE_CANCEL');
            return false;
        }
        if (state.likeYn === 'N') {
            updateRecom('LIKE_OK');
            return false;
        }
    };

    const handleRecomHate = (event) => {
        event.preventDefault();
        if (memberNo === -1) {
            alert("로그인 후 이용해주세요.");
            return false;
        }
        if (props.replyerNo === memberNo) {
            alert("댓글 작성자는 추천할 수 없습니다.");
            return false;
        }
        if (state.hateYn === 'Y') {
            updateRecom('HATE_CANCEL');
            return false;
        }
        if (state.hateYn === 'N') {
            updateRecom('HATE_OK');
            return false;
        }
    };

    const updateRecom = (likeAction) => {
        const formData = new FormData();
        formData.append('bno', props.bno);
        formData.append('replyerNo', props.replyerNo);
        formData.append('rcd', props.rcd);
        formData.append('rno', props.rno);
        formData.append('likeAction', likeAction);
        formData.append('hateYn', state.hateYn);
        formData.append('likeYn', state.likeYn);
        post('/reply/updateRecom', formData)
            .then(res => {
                const data = res.data.data;
                setState({
                    likeYn: data.likeMember === memberNo && data.likeYn === 'Y' ? 'Y' : 'N',
                    hateYn: data.hateMember === memberNo && data.hateYn === 'Y' ? 'Y' : 'N',
                    likeCnt: data.likeCnt,
                    hateCnt: data.hateCnt
                })
            })
            .catch(err => console.log(err));
    }
    
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
                <td colSpan="1" className={classes.setting}>
                    {props.replyerNo === memberNo
                        ? <ReplyDelete replyerNo={props.replyerNo} rcd={props.rcd} callBackApi={props.callBackApi}/>
                        : null
                    }
                </td>
            </TableRow>
            <TableRow>
                <td colSpan="3" className={classes.title}>{props.replyText}</td>
            </TableRow>
            <TableRow>
                <TableCell colSpan="3">
                    {state.likeYn === 'Y'
                        ? 
                        <IconButton onClick={handleRecomLike}>
                            <ThumbUpAlt />
                        </IconButton>
                        :
                        <IconButton onClick={handleRecomLike}>
                            <ThumbUpOutlined />
                        </IconButton>
                    }
                    {state.likeCnt}

                    {state.hateYn === 'Y'
                        ? 
                        <IconButton onClick={handleRecomHate}>
                            <ThumbDownAlt />
                        </IconButton>
                        :
                        <IconButton onClick={handleRecomHate}>
                            <ThumbDownOutlined />
                        </IconButton>
                    }
                    {state.hateCnt}
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default ReplyTable;