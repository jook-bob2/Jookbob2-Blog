import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableRow
  } from '@material-ui/core';
import {post} from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const styles = makeStyles(theme => ({
    root: {},
    main: {
        padding: 50,
        marginRight: '5%'
    },
    select: {
        marginBottom: 10
    },
    selectWt: {
        width: '100%',
        height: 30
    },
    input: {
        marginBottom: 10
    },
    inputWt: {
        width: '100%',
        height: 30
    },
    textArea: {
        
    },
    content: {
        padding: 30
    },
    contentWt: {
        height: 300,
        width: '100%'
    },
    buttonArea: {
        textAlign: 'center',
        margin: 20,
        padding: 20
    },
    submit: {
        marginRight: 10
    },
    cancel: {
        marginLeft: 10,
        backgroundColor: '#e83553'
    },
    avatar: {
        // width: 50,
        // height: 50
    },
    avatarTd: {
        padding: 10
    }
}));

const BoardInsert = props => {
    const classes = styles();
    const { className, location, history, ...rest } = props;
    console.log(JSON.stringify(props));
    
    const [state, setState] = useState({
        memberNo: location.query !== undefined ? location.query.memberNo : '',
        title: '',
        content: '',
        brdCode: ''
    });

    const [member, setMember] = useState({
        userName: '',
        avatar: ''
    });

    useEffect(() => {
        callMember()
            .then(res => {
                const list = res.data.list;
                setMember({
                    userName: list.name,
                    avatar: list.profileImg
                })
            });
    },[]);

    const callMember = async() => {
        const url = 'member/viewMember';
        return post(url);
    }

    const handleChange = event => {
        console.log([event.target.name]);
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (state.brdCode === '' || state.title === '' || state.content === '') {
            alert("내용을 입력하세요.");
            return false;
        }
        event.preventDefault();
        saveBoard(event)
            .then(res => {
                alert("게시물이 등록 되었습니다.\n게시판 목록으로 이동합니다.");
                window.location.href = "/boardList";
            });
    };

    const saveBoard = (event) => {
        const url = "/board/saveBoard";
        const formData = new FormData();
        formData.append("writerNo", state.memberNo);
        formData.append("title", state.title);
        formData.append("content", state.content);
        formData.append("brdCode", state.brdCode);
        return post(url, formData);
    }
    
    document.onkeydown = function(e){
        /* F5, Ctrl+r, Ctrl+F5 */
        if(e.keyCode == 116 || e.ctrlKey == true && (e.keyCode == 82)){
            e.cancelBubble = true; 
            e.returnValue = false; 
            alert("새로고침하면 데이터가 저장되지 않습니다.");
            setTimeout(function(){
                window.location.reload();
            }, 1000);
            return false;
        }
    }
    
    return (
        <div className={classes.main}>
            <Card
                className={clsx(classes.root, className)}
            >
                <Table>
                    <colgroup>
                        <col width="5%"/>
                        <col width="90%"/>
                    </colgroup>
                    <TableBody>
                        <TableRow>
                            <td className={classes.avatarTd}>
                            <Avatar
                                alt="Person"
                                className={classes.avatar}
                                src={member.avatar}
                                //component={RouterLink}
                                //src=""
                                //to="/setting"
                            />
                        </td>
                        <td>{member.userName}</td>
                        </TableRow>
                    </TableBody>
                
                </Table>
                <Divider />
                <form
                    onSubmit={handleSubmit}
                >  
                    <div className={classes.content}>
                        <div className={classes.select}>
                            <select className={classes.selectWt} onChange={handleChange} name="brdCode">
                                <option value>게시판 유형을 선택하세요.</option>
                                <option value="00">Q&A</option>
                                <option value="01">취업관련</option>
                                <option value="02">일상관련</option>
                            </select>
                        </div>
                        <div className={classes.input}>
                            <input className={classes.inputWt} placeholder="제목을 입력해 주세요." onChange={handleChange} name="title"></input>
                        </div>
                        <div className={classes.textArea}>
                            <textarea className={classes.contentWt} onChange={handleChange} name="content"></textarea>
                        </div>
                    </div>
                    <div className={classes.buttonArea}>
                        
                        <Button 
                            color="primary"
                            variant="contained"
                            type="submit"
                            className={classes.submit}
                        >
                            등록
                        </Button>
                        <RouterLink to="/boardList">
                            <Button 
                                color="secondary"
                                variant="contained"
                                className={classes.cancel}
                            >
                                취소
                            </Button>
                        </RouterLink>
                        
                    </div>
                    
                </form>
            </Card>
        </div>
    );

};

export default BoardInsert;