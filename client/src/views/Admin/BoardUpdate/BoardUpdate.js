import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Divider,
    Button,
    Avatar,
    Table,
    TableBody,
    TableRow
  } from '@material-ui/core';
import {post} from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

const BoardUpdate = props => {
    const classes = styles();
    const { className, match, history } = props;

    const [state, setState] = useState({
        bno: match.params.id,
        title: '',
        content: '',
        brdCode: '',
        userName: '',
        avatar: '',
        memberNo: ''
    });

    useEffect(() => {
        post(`/boardManagement/boardUpdateList/${state.bno}`)
            .then(res => {
                setState(state => ({
                    ...state,
                    title: res.data.title,
                    content: res.data.content,
                    brdCode: res.data.brdCode,
                    userName: res.data.name,
                    avatar: res.data.profileImg,
                    memberNo: res.data.memberNo
                }));
            })
            .catch(err => {
                throw(err);
            });
    }, [state.bno]);
    
    const handleChange = (event) => {
        event.persist();
        if (event.target !== undefined) {
            setState(state => ({
                ...state,
                [event.target.name]: event.target.value
            }));
        }
    };
    
    const handleEditor = (event, editor) => {
        setState(state => ({
            ...state,
            content: editor.getData()
        }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (state.brdCode === '') {
            alert("게시판 유형을 선택하세요.");
            document.getElementsByName('brdCode')[0].focus();
            return false;
        }
        if (state.title === '') {
            alert("제목을 입력하세요.");
            document.getElementsByName('title')[0].focus();
            return false;
        }
        if (state.content === '') {
            alert("내용을 입력하세요.");
            return false;
        }
        event.preventDefault();
        updateBoard()
            .then(res => {
                alert("게시물이 수정 되었습니다.\n해당 게시물로 이동합니다.");
                history.goBack();
            });
    };

    const updateBoard = () => {
        const url = "/boardManagement/updateBoard";
        const formData = new FormData();

        formData.append("bno", state.bno);
        formData.append("title", state.title);
        formData.append("content", state.content);
        formData.append("brdCode", state.brdCode);

        return post(url, formData);
    }

    const handleCancel = () => {
        history.goBack();
    }
    
    // document.onkeydown = function(e){
    //     /* F5, Ctrl+r, Ctrl+F5 */
    //     if((e.keyCode === 116) || (e.ctrlKey === true && e.keyCode === 82)){
    //         e.cancelBubble = true; 
    //         e.returnValue = false; 
    //         alert("새로고침하면 데이터가 저장되지 않습니다.");
    //         setTimeout(function(){
    //             window.location.reload();
    //         }, 1000);
    //         return false;
    //     }
    // }
    
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
                                src={state.avatar}
                            />
                            </td>
                            <td>{state.userName}</td>
                        </TableRow>
                    </TableBody>
                
                </Table>
                <Divider />
                <form onSubmit={handleSubmit}>  
                    <div className={classes.content}>
                        <div className={classes.select}>
                            <select className={classes.selectWt} onChange={handleChange} name="brdCode" value={state.brdCode}>
                                <option value>게시판 유형을 선택하세요.</option>
                                <option value="00">Q&A</option>
                                <option value="01">취업관련</option>
                                <option value="02">일상관련</option>
                            </select>
                        </div>
                        <div className={classes.input}>
                            <input className={classes.inputWt} placeholder="제목을 입력해 주세요." onChange={handleChange} name="title" value={state.title}></input>
                        </div>
                        <div className={classes.textArea}>
                            <CKEditor 
                                editor={ClassicEditor} 
                                onChange={handleEditor} 
                                name="content" 
                                config={
                                    {
                                        ckfinder: {
                                            uploadUrl: `/boardManagement/uploadImg`
                                        },
                                    }
                                }
                                data={state.content}
                            />
                        </div>
                    </div>
                    <div className={classes.buttonArea}>
                        <Button 
                            color="primary"
                            variant="contained"
                            className={classes.submit}
                            type="submit"
                        >
                            수정
                        </Button>
                        
                        <Button 
                            color="secondary"
                            variant="contained"
                            className={classes.cancel}
                            onClick={handleCancel}
                        >
                            취소
                        </Button>
                    </div>
                    
                </form>
            </Card>
        </div>
    );

};

export default BoardUpdate;