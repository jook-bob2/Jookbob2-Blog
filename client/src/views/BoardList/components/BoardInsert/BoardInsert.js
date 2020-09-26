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
    avatar: {
        // width: 50,
        // height: 50
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
    const { className, location, history, match } = props;
    const [state, setState] = useState({
        memberNo: location.query !== undefined ? location.query.memberNo : '',
        brdText: location.query !== undefined ? location.query.brdText : '',
        title: '',
        content: '',
        brdCode: ''
    });

    const [showText, setShowText] = useState([]);
    const [typeOpen, setTypeOpen] = useState(false);

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
        post(`/boardManagement/getShowText`)
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
    }, [match.params.brdCode]);

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
        formData.append("writerNo", state.memberNo);
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
                                editor={ClassicEditor} 
                                onChange={handleEditor} 
                                name="content" 
                                config={
                                    {
                                        ckfinder: {
                                            uploadUrl: '/board/uploadImg'
                                        },
                                        // codeBlock: {
                                        //     languages: [
                                        //         // Do not render the CSS class for the plain text code blocks.
                                        //         { language: 'plaintext', label: 'Plain text', class: '' },
                                
                                        //         // Use the "php-code" class for PHP code blocks.
                                        //         { language: 'php', label: 'PHP', class: 'php-code' },
                                
                                        //         // Use the "js" class for JavaScript code blocks.
                                        //         // Note that only the first ("js") class will determine the language of the block when loading data.
                                        //         { language: 'javascript', label: 'JavaScript', class: 'js javascript js-code' },
                                
                                        //         // Python code blocks will have the default "language-python" CSS class.
                                        //         { language: 'python', label: 'Python' }
                                        //     ]
                                        // },
                                        // toolbar: {
                                        //     items:
                                        //     [
                                        //       'heading', '|', 
                                        //       'alignment', 'bold', 'italic', 'highlight', '|',
                                        //       'link', 'bulletedList', 'numberedList', 'imageUpload', '|',
                                        //       'blockQuote', 'insertTable', 'mediaEmbed', '|',
                                        //       'undo', 'redo', 'codeBlock'
                                        //     ],
                                        // },
                                    }
                                }
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

export default BoardInsert;