import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import {
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Avatar,
    Button
  } from '@material-ui/core';
import {post} from 'axios';
import ReplyTable from '../ReplyTable';

const styles = makeStyles(theme => ({
    root: {
        margin: '50px',
        marginRight: '10%'
    },
    content: {
        padding: 0
    },
    avatarTd: {
        padding: '5px 0px 5px 5px'
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
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "21px",
        letterSpacing: "-0.05px",
        verticalAlign: "inherit",
        color: "#1886C4"
    },
    writer: {
        borderRight: 'solid 1px lightgray',
    },
    title: {
        padding: '20px 15px 0px 15px'
        //borderRight: 'solid 1px lightgray'
    },
    textarea: {
        padding: '20px 20px 0px 20px'
    },
    contentWt: {
        height: 100,
        width: '100%'
    },
    register: {
        textAlign: 'right',
        padding: '15px 20px 0px 15px'
    },
    signIn: {
        textAlign: 'center',
    }
}));

const Reply = props => {
    const classes = styles();
    const { className } = props;

    const [replyState, setReplyState] = useState({
        values: '',
        count: 0,
        memberNo: props.memberNo,
        bno: props.bno
    });

    const [state, setState] = useState({
        replyText: '',
        memberNo: props.memberNo,
        bno: props.bno,
        avatar: '',
        replyer: ''
    });
    
    const callBackApi = useCallback(() => {
        const url = '/reply/replyList';
        const formData = new FormData();
        formData.append('bno', props.bno);
        post(url, formData).then(res => {
            setReplyState(replyState => ({
                ...replyState,
                values: res.data.list
            }));
        })
        .catch(err => console.log(err));;
    }, [props.bno]);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        callBackApi();

        const timer = setInterval(progressCount, 20);
    
        return () => {
        clearInterval(timer);
        };
    }, [callBackApi]);

    const progressCount = () => {
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const setValueComponents = (data) => {
        return data.map((c) => {
          return <ReplyTable 
                    replyState={replyState} 
                    key={c.rcd} 
                    bno={c.bno} updateYn={c.updateYn} createDt={c.createDt} replyer={c.replyer} recCnt={c.recCnt} avatar={c.avatar} replyText={c.replyText}
                />
        });
    }

    /*
        insert 부분
    */

   useEffect(() => {
        const callMember = () => {
            return post('/member/viewMember');
        };
        callMember()
            .then(res => {
                const list = res.data.list;
                if (res.data.message === "succeed") {
                    setState(state => ({
                        ...state,
                        avatar: list.profileImg,
                        replyer: list.name
                    }));
                }
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.replyText !== '') {
            insertReply()
                .then(res => {
                    if (res.data === 'succeed') {
                        callBackApi();
                        document.getElementsByName('replyText')[0].value = "";
                    }
                })
                .catch(err => console.log(err));
        } else {
            alert("댓글 내용을 입력해주세요.");
        }
        
    };

    const insertReply = () => {
        const url = "/reply/replyInsert";
        const formData = new FormData();
        formData.append("bno", parseInt(state.bno, 10));
        formData.append("memberNo", parseInt(state.memberNo, 10));
        formData.append("replyer", state.replyer);
        formData.append("replyText", state.replyText);
        return post(url, formData);
    };

    const handleChange = (event) => {
        event.preventDefault();
        if (state.memberNo === -1) {
            window.location.href = "/sign-in";
        } else {
            setState({
                ...state,
                [event.target.name]: event.target.value
            });
        }
    };


    return (
        <Card className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <div >
                    <Table>
                        <colgroup>
                            <col width="2%"/>
                            <col width="60%"/>
                            <col width="38%"/>
                        </colgroup>
                        {replyState.values ? setValueComponents(replyState.values) :
                            <TableBody>
                                <TableRow>
                                <TableCell colSpan="2" align="center">
                                    <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress>
                                </TableCell>
                                </TableRow>
                            </TableBody>
                        }
                    </Table>
                    
                </div>
            </CardContent>
            <CardContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <Table>
                        <colgroup>
                            <col width="2%"/>
                            <col width="60%"/>
                            <col width="38%"/>
                        </colgroup>
                        <TableBody>
                            <TableRow>
                                <td colSpan="1" className={classes.avatarTd}>
                                    <Avatar
                                        alt="Person"
                                        className={classes.avatar}
                                        src={state.avatar}
                                    />
                                </td>
                                
                                <td colSpan="1"><span>{state.replyer}</span></td>
                            </TableRow>
                            <TableRow>
                                {state.memberNo === -1 || state.replyer === ''
                                    ? 
                                    <td colSpan="2" className={classes.textarea}>
                                        <h4 className={classes.signIn}><RouterLink to={{ pathname: "/sign-in" }}>[ 로그인 ]</RouterLink> 후 이용해주세요.</h4>
                                    </td>
                                    :
                                    <td colSpan="2" className={classes.textarea}>
                                        <textarea className={classes.contentWt} placeholder="댓글 쓰기" name="replyText" onChange={handleChange}></textarea>
                                    </td>
                                }
                                
                            </TableRow>
                        </TableBody>
                    </Table>
                    {state.memberNo === -1 || state.replyer === ''
                        ? 
                        null
                        :
                        <div className={classes.register}>
                            <Button variant="contained" color="primary" type="submit">등록</Button>
                        </div>
                    }
                </form>
            </CardContent>
        </Card>
    );
};

export default Reply;