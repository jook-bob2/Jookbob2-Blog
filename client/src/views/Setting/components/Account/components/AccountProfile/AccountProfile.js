import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Divider,
  Button
} from '@material-ui/core';
import {post} from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(1)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  hidden: {
    display: 'none'
  },
  removeBtn: {
    color: '#d50000'
  },
  userName: {
    marginBottom: 20
  }
}));

const AccountProfile = props => {
  const { className } = props;

  const classes = useStyles();
  
  const [state, setState] = useState({
    memberNo: props.memberNo !== undefined ? props.memberNo : '',
    email: '',
    userId: '',
    file: null,
    userName: '',
    fileName: '',
    avatar: '',
    createDt: 0,
  });

  useEffect(() => {
    callMember()
      .then(res => {
        const list = res.data.list;
        setState({
          ...state,
          memberNo:list.memberNo,
          userId:list.userId,
          userName:list.name,
          email:list.email,
          createDt:list.createDt,
          updateDt:list.updateDt,
          avatar:list.profileImg
        })
      })
      .catch(err => console.log(err));
  }, [state.memberNo]);

  const callMember = async() => {
    const url = 'member/viewMember';
    const formData = new FormData();
    formData.append('memberNo', props.memberNo);
    return post(url, formData);
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    addPicture(e)
      .then(res => {
        console.log(res);
        setState({
          ...state,
          avatar: res.data.profileImg
        });
      })
      .catch(err => console.log(err));
  };

  const addPicture = (e) => {
    const url = '/member/uploadPicture';
    const formData = new FormData();
    //formData.append('memberNo', state.memberNo);
    formData.append('image', e.target.files[0]);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    return post(url, formData, config);
  }

  const handleFileRemove = () => {
    removePicture()
    .then(res => {
      setState({
        ...state,
        avatar: res.data ? '' : state.avatar,
        fileName: ''
      })
      res.data ? alert("이미지가 삭제되었습니다.") : alert("삭제 할 이미지가 존재하지 않습니다.")
    })   
  };


  const removePicture = () => {
    const url = '/member/removePicture';
    return post(url);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <h2 className={classes.userName}>{state.userName}({state.userId})</h2>
            <div>
              가입일 : {moment(state.createDt).format('YYYY-MM-DD hh:mm:ss')}
            </div>
            <div>
              수정일 : {moment(state.updateDt).format('YYYY-MM-DD hh:mm:ss')}
            </div>
          </div>
          <Avatar
            className={classes.avatar}
            src={state.avatar}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <input className={classes.hidden} type="file" accept="image/*" id="raised-button-file" file={state.file} value={state.fileName} onChange={handleFileChange}></input>
        <label htmlFor="raised-button-file">
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="contained"
            component="span" 
            name="file"
          >
            {state.avatar === "" ? "Upload picture" : "Update picture"}
          </Button>
        </label>
        {state.avatar === "" ? null : <Button variant="outlined" color="secondary" onClick={handleFileRemove}>Remove picture</Button>}
        
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

export default AccountProfile;
