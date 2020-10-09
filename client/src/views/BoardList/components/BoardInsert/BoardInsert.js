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
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { editorConfiguration } from 'common/Editor/Editor';
import { useSelector } from 'react-redux';


const styles = makeStyles(theme => ({
    root: {},
    main: {
        padding: 50,
        marginRight: '5%'
    },
    select: {
        marginBottom: 10
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
        minHeight: 300
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
    avatarTd: {
        padding: 10
    },
    selectWt: {
        width: 400,
        marginTop: 20
    },
}));

const BoardInsert = props => {
    const classes = styles();
    const { className, history, match } = props;
    const [state, setState] = useState({
        title: '',
        content: '',
        brdCode: ''
    });

    const [showText, setShowText] = useState([]);
    const [typeOpen, setTypeOpen] = useState(false);
    const session = useSelector(state => state.session, []) || [];
    const memberNo = session.memberNo;

    const [member, setMember] = useState({
        userName: '',
        avatar: ''
    });

    useEffect(() => {
        post(`/member/viewMember`)
            .then(res => {
                const list = res.data.list;
                setMember({
                    userName: list.name,
                    avatar: list.profileImg
                })
            });
    },[]);

    useEffect(() => {
        const formData = new FormData();

        formData.append('memberNo', memberNo);

        post(`/board/getShowText`, formData)
            .then(res => {
                setShowText(res.data.list);
                setState(state => ({
                    ...state,
                    brdCode: match.params.brdCode
                }));
            })
            .catch(err => {
                throw(err);
            });
    }, [match.params.brdCode, memberNo]);

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
        saveBoard(event)
            .then(res => {
                alert("게시물이 등록 되었습니다.\n게시판 목록으로 이동합니다.");
                history.goBack();
            });
    };

    const saveBoard = (event) => {
        const url = "/board/saveBoard";
        const formData = new FormData();
        formData.append("writerNo", memberNo);
        formData.append("writer", member.userName);
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
    
    const handleCancel = () => {
        history.goBack();
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
                                    //component={RouterLink}
                                    //src=""
                                    //to="/setting"
                                />
                            </td>
                            <td><h4>{member.userName}</h4></td>
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
                            <input className={classes.inputWt} placeholder="제목을 입력해 주세요." onChange={handleChange} name="title"></input>
                        </div>
                        <div className={classes.textArea}>
                            <CKEditor
                                editor={ ClassicEditor }
                                config={ editorConfiguration }
                                name="content"
                                onChange={ handleEditor }
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
                            등록
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

export default BoardInsert;