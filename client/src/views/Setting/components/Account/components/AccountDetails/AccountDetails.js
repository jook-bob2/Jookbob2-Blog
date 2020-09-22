import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core';
import {post} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getViewMember } from 'store/actions/front/viewMember';
import DaumPostcode from 'react-daum-postcode';

const useStyles = makeStyles(() => ({
  root: {
    //width: '100%'
  },
  btn: {
    padding: "16px"
  },
  mapBtn: {
    paddingTop: 8
  }
}));

const AccountDetails = props => {
  const { className } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector(state => state.frontViewMember, '') || '';

  const [values, setValues] = useState({
    memberNo: props.memberNo,
    name: '',
    email: '',
    phoneNo: '',
    address1: '',
    address2: '',
    postNo: ''
  });

  const [open, setOpen] = useState(false);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    dispatch(getViewMember());
  },[dispatch]);

  useEffect(() => {
    setValues(state => ({
      ...state,
      name: user.name,
      email: user.email,
      phoneNo: user.phoneNo,
      address1: user.address1,
      address2: user.address2,
      postNo: user.postNo
    }));
  }, [user]);

  const handleSubmit = event => {
    event.preventDefault();
    
    saveProfile(event)
      .then(res => {
        alert("저장되었습니다.");
        dispatch(getViewMember());
      });
  }

  const saveProfile = () => {
    const url = "/member/saveProfile";
    const formData = new FormData();
    formData.append("name",values.name);
    formData.append("email",values.email);
    formData.append("phoneNo",values.phoneNo);
    formData.append("address1",values.address1);
    formData.append("address2",values.address2);
    formData.append("memberNo",values.memberNo);
    formData.append("postNo",values.postNo);
    return post(url, formData);
  }

  const handleComplete = (data) => {
    let address = '';
    let postNo = data.zonecode;
    
    if (data.userSelectedType === 'J') { // 지번 주소
        address = data.jibunAddress;
        
    } else if (data.userSelectedType === 'R') { // 도로명 주소
        address = data.address;
    }

    setValues(values => ({
        ...values,
        address1: address,
        postNo: postNo
    }));

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMap = () => {
    setOpen(true);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form
        //autoComplete="off"
        //noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="원하는 정보를 수정하세요."
          title="회원 상세 정보"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={8}
            >
              <TextField
                fullWidth
                //helperText="Please specify the first name"
                label="이름"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
          >
          <Grid
              item
              md={4}
              xs={8}
            >
              <TextField
                fullWidth
                label="Email 주소"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={8}
            >
              <TextField
                fullWidth
                label="연락처"
                margin="dense"
                name="phoneNo"
                onChange={handleChange}
                //type="number"
                value={values.phoneNo || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={8}
            >
              <TextField
                fullWidth
                label="우편번호"
                margin="dense"
                name="postNo"
                onChange={handleChange}
                //required
                //select
                //SelectProps={{ native: true }}
                value={values.postNo || ''}
                variant="outlined"
              >
              </TextField>
            </Grid>
            <Grid
              item
              md={4}
              xs={8}
            >
              <div className={classes.mapBtn}>
                <Button 
                  color="primary"
                  variant="contained"
                  onClick={handleOpenMap}
                >
                  주소찾기
                </Button>
              </div>
            </Grid>
          </Grid>
          
          <Grid
            container
            spacing={3}
          >
          <Grid
              item
              md={4}
              xs={8}
            >
              <TextField
                fullWidth
                label="주소"
                margin="dense"
                name="address1"
                onChange={handleChange}
                required
                value={values.address1 || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={8}
            >
              <TextField
                fullWidth
                label="나머지 주소"
                margin="dense"
                name="address2"
                onChange={handleChange}
                required
                value={values.address2 || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.btn}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            저장
          </Button>
        </CardActions>
      </form>

      <Dialog
          open={open}
          onClose={handleClose}
      >
          <DialogTitle>주소찾기</DialogTitle>
          <Divider />
          <DialogContent>
              <DaumPostcode onComplete={handleComplete}/>
          </DialogContent>
      </Dialog>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
