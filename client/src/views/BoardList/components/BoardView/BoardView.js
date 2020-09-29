import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import {
    Card,
    CardContent,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableRow
  } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import {post} from 'axios';
import moment from 'moment';
import BoardDelete from '../BoardDelete';
import Reply from '../Reply';

const styles = makeStyles(theme => ({
    root:{
        margin: '50px',
        marginRight: '10%'
    },
    content: {
        padding: 0,
        overflow: 'auto'
    },
    inner: {
        minWidth: 1050
    },
    avatarTd: {
        padding: '5px 0px 5px 5px',
        borderBottom: '1px solid #eeeeee'
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
    deskTopCode: {
        fontSize: '0.8rem',
        background: '#eee',
        border: '0 solid #3d7e9a',
        color: '#333',
        marginTop: 0,
        marginBottom: 20,
        padding: 15,
        position: 'relative',
        fontFamily: 'consolas,monaco,"Andale Mono",monospace',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.5,
        overflow: 'auto',
        direction: 'ltr!important',
        textAlign: 'left!important',
        borderLeftWidth: '5px!important',
        borderRightWidth: '0!important',
        tabSize: 4,
        hyphens: 'none',
    },
    mobileCode: {
        fontSize: '0.4rem',
        background: '#eee',
        border: '0 solid #3d7e9a',
        color: '#333',
        marginTop: 0,
        marginBottom: 20,
        padding: 15,
        position: 'relative',
        fontFamily: 'consolas,monaco,"Andale Mono",monospace',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 1.5,
        overflow: 'auto',
        direction: 'ltr!important',
        textAlign: 'left!important',
        borderLeftWidth: '5px!important',
        borderRightWidth: '0!important',
        tabSize: 4,
        hyphens: 'none',
    }
}));

const BoardView = props => {
    const classes = styles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });
    const { className, location, match, history } = props;

    const [state, setState] = useState({
        bno: match.params !== undefined ? match.params.bno : '',
        memberNo: location.query !== undefined ? location.query.memberNo : '',
        brdText: location.query !== undefined ? location.query.brdText : '',
        bKinds: location.query !== undefined ? location.query.bKinds : '',
        title: '',
        writer: '',
        writerNo: '',
        createDt: '',
        updateDt: '',
        content: '',
        avatar: '',
        showText: ''
    });

    const options = {
        decodeEntities: true,
        transform
    };

    function transform(node, index) {
        if (node.type === "tag" && node.name === "code") {
            const data = node.children[0].data;

            if (isDesktop) {
                return (
                    <div className={classes.deskTopCode} key={index}>
                        {data}
                    </div>
                );
            } else {
                return (
                    <div className={classes.mobileCode} key={index}>
                        {data}
                    </div>
                );
            }
        }

        if (node.type === "tag" && node.name === "oembed") {
            const vCode = node.attribs.url.split("v=")[1];
            const url = `https://www.youtube.com/embed/${vCode}`;
    
            if (isDesktop) {
                return (
                    // eslint-disable-next-line jsx-a11y/iframe-has-title
                    <iframe
                        key={index}
                        src={url} width="720" height="380" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                );
            } else {
                return (
                    // eslint-disable-next-line jsx-a11y/iframe-has-title
                    <iframe
                        key={index}
                        src={url} width="360" height="180" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                );
            }
        }
    }

    const callBackView = useCallback(() => {
        post('/board/boardDetail/' + match.params.bno).then(res => {
            const list = res.data.list[0];
            setState(state => ({
                ...state,
                bno: list.bno,
                title: list.title,
                brdText: list.brdText,
                bKinds: list.bKinds,
                writer: list.writer,
                writerNo: list.writerNo,
                createDt: list.createDt,
                updateDt: list.updateDt,
                content: list.content,
                showText: list.showText,
                avatar: list.profileImg
            }));
        })
        .catch(err => console.log(err));
    }, [match.params.bno]);

    useEffect(() => {
        if (state.bno !== '') {
            callBackView();
        }
    }, [callBackView, state.bno]);

    return (
        <div>
            <Card
                className={clsx(classes.root, className)}
            >
                
                <CardContent className={classes.content}>
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
                                        //component={RouterLink}
                                        //src=""
                                        //to="/setting"
                                    />
                                </td>
                                <td colSpan="1"><span>{state.writer}</span><br/>
                                    {state.createDt !== '' ?  <span><h6>{moment(state.createDt).format('YYYY.MM.DD hh:mm:ss')}</h6></span> : '' }
                                </td>
                            </TableRow>
                            <TableRow>
                                <td className={classes.bno} colSpan="2"><h5>#{state.bno} {state.showText}</h5></td>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="2"><h2>{state.title}</h2></TableCell>
                            </TableRow>
                            <TableRow>
                                <td colSpan="2" className={classes.content2} id="content">{ReactHtmlParser(state.content, options)}</td>
                            </TableRow>
                        </TableBody> 
                        
                    </Table>
                    <BoardDelete history={history} state={state} bno={state.bno} writerNo={state.writerNo} memberNo={state.memberNo} brdText={state.brdText} bKinds={state.bKinds}></BoardDelete>
                </CardContent>
            </Card>
            <Reply bno={state.bno} />
        </div>
    );

};

export default BoardView;