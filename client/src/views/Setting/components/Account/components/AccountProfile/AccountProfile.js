import React, { useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { getViewMember } from 'store/actions/front/viewMember';

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

  const dispatch = useDispatch();

  const user = useSelector(state => state.frontViewMember, '') || '';

  useEffect(() => {
    dispatch(getViewMember());
  }, [dispatch]);

  const handleFileChange = (e) => {
    e.preventDefault();
    addPicture(e)
      .then(res => {
        dispatch(getViewMember());
      })
      .catch(err => console.log(err));
  };

  const addPicture = (e) => {
    const url = '/member/uploadPicture';
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    return post(url, formData, config);
  }

  const handleFileRemove = () => {
    post(`/member/removePicture`)
      .then(res => {
        dispatch(getViewMember());
        res.data ? alert("이미지가 삭제되었습니다.") : alert("삭제 할 이미지가 존재하지 않습니다.");
      })
      .catch(err => {
        throw(err);
      });
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <h2 className={classes.userName}>{user.userName}({user.userId})</h2>
            <div>
              가입일 : {moment(user.createDt).format('YYYY-MM-DD hh:mm:ss')}
            </div>
            <div>
              수정일 : {moment(user.updateDt).format('YYYY-MM-DD hh:mm:ss')}
            </div>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <input className={classes.hidden} type="file" accept="image/*" id="raised-button-file" file={user.file} value={user.fileName} onChange={handleFileChange}></input>
        <label htmlFor="raised-button-file">
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="contained"
            component="span" 
            name="file"
          >
            {user.avatar === "" ? "사진 등록" : "사진 수정"}
          </Button>
        </label>
        {user.avatar === "" ? null : <Button variant="outlined" color="secondary" onClick={handleFileRemove}>사진 삭제</Button>}
        
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

export default AccountProfile;
