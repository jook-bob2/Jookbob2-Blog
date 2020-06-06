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
  Typography,
  Divider,
  Button,
  LinearProgress
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
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  hidden: {
    display: 'none'
  },
  removeBtn: {
    color: '#d50000'
  }
}));

const AccountProfile = props => {
  const { className } = props;

  const classes = useStyles();
  
  const [state, setState] = useState({
    memberNo: props.memberNo,
    email: '',
    userId: '',
    file: null,
    userName: '',
    fileName: '',
    avatar: '',
    createDt: '',
  });

  useEffect(() => {
    callMember()
      .then(res => {
        const list = res.data.list;
        setState({
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
  },[]);

  const callMember = async() => {
    const url = 'member/viewMember';
    const formData = new FormData();
    formData.append('memberNo', props.memberNo);
    return post(url, formData);
  }

  const handleFileChange = (e) => {
    e.persist();
    e.preventDefault();
    addPicture(e)
      .then(res => {
        setState({
          ...state,
          avatar: res.data.profileImg,
          fileName: e.target.files[0]
        })
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
            <Typography
              gutterBottom
              variant="h2"
            >
              {state.userName}({state.userId})
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              가입일 : {moment(state.createDt).format('YYYY.MM.DD')}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              수정일 : {moment(state.updateDt).format('YYYY.MM.DD')}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={state.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
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
            {state.fileName === "" ? "Upload picture" : "Update picture"}
          </Button>
        </label>
        {state.fileName === "" ? null : <Button variant="outlined" color="secondary" onClick={handleFileRemove}>Remove picture</Button>}
        
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

export default AccountProfile;
