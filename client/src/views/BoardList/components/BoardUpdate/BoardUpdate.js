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
    TableRow,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from '@material-ui/core';
import {post} from 'axios';
import { Link as RouterLink } from 'react-router-dom';
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
        width: 400,
        marginTop: 20
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
    const { className, location, history } = props;

    const [state, setState] = useState({
        list: location.query !== undefined ? location.query.state : {},
        title: location.query !== undefined ? location.query.state.title : '',
        content: location.query !== undefined ? location.query.state.content : '',
        brdCode: '',
        brdText: location.query !== undefined ? location.query.state.brdText : ''
    });

    const [member, setMember] = useState({
        userName: '',
        avatar: ''
    });

    const [showText, setShowText] = useState([]);
    const [typeOpen, setTypeOpen] = useState(false);

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

    useEffect(() => {
        post(`/boardManagement/getShowText`)
            .then(res => {
                setShowText(res.data.list);
                setState(state => ({
                    ...state,
                    brdCode: location.query !== undefined ? location.query.state.bKinds : ''
                }))
            })
            .catch(err => {
                throw(err);
            });
    }, [location.query]);

    const callMember = async() => {
        const url = '/member/viewMember';
        return post(url);
    }

    const handleChange = (event, editor) => {
        if (event.target !== undefined) {
            setState({
                ...state,
                [event.target.name]: event.target.value
            });
        }
        if (editor !== undefined) {
            setState({
                ...state,
                content: editor.getData()
            });
        }
    };

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
        updateBoard(event)
            .then(res => {
                alert("게시물이 수정 되었습니다.\n해당 게시물로 이동합니다.");
                history.goBack();
            });
    };

    const updateBoard = (event) => {
        const url = "/board/updateBoard";
        const formData = new FormData();
        formData.append("title", state.title);
        formData.append("content", state.content);
        formData.append("brdCode", state.brdCode);
        return post(url, formData);
    }
    
    const handleBrdTypeClose = () => {
        setTypeOpen(false);
    };

    const handleBrdTypeOpen = (event) => {
        event.preventDefault();
        
        setTypeOpen(true);
    };
    
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
                            <FormControl>
                                <InputLabel id="selectBrdTypeLabel">게시판 유형을 선택하세요.</InputLabel>
                                <Select
                                    labelId="selectBrdTypeLabel"
                                    className={classes.selectWt}
                                    name="brdCode"
                                    value={state.brdCode}
                                    onChange={handleChange}
                                    open={typeOpen}
                                    onClose={handleBrdTypeClose}
                                    onOpen={handleBrdTypeOpen}
                                >
                                    <MenuItem value=''>선택하세요.</MenuItem>
                                    {showText.map(c => 
                                        <MenuItem key={c.bKindsNo} value={c.brdCode}>{c.showText}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.input}>
                            <input className={classes.inputWt} placeholder="제목을 입력해 주세요." onChange={handleChange} name="title" value={state.title}></input>
                        </div>
                        <div className={classes.textArea}>
                            <CKEditor 
                                editor={ClassicEditor} 
                                onChange={handleChange} 
                                name="content" 
                                config={
                                    {
                                        ckfinder: {
                                            uploadUrl: '/board/uploadImg'
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
                            type="submit"
                            className={classes.submit}
                        >
                            수정
                        </Button>
                        <RouterLink to={state.brdText}>
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

export default BoardUpdate;