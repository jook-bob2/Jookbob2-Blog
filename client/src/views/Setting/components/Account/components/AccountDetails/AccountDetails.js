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
  TextField
} from '@material-ui/core';
import {post} from 'axios';

const useStyles = makeStyles(() => ({
  root: {},
  btn: {
    padding: "16px"
  }
}));

const AccountDetails = props => {
  const { className } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    memberNo: props.memberNo,
    name: '',
    email: '',
    phoneNo: '',
    state: 'Alabama',
    address1: '',
    address2: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    callMember()
      .then(res => {
        const list = res.data.list;
        setValues({
          memberNo: list.memberNo,
          name: list.name,
          email: list.email,
          phoneNo: list.phoneNo,
          address1: list.address1,
          address2: list.address2
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

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  const handleSubmit = event => {
    event.preventDefault();
    
    saveProfile(event)
     .then(res => {
       alert("저장완료!");
       window.location.reload();
     })
  }

  const saveProfile = (event) => {
    const url = "member/saveProfile";
    const formData = new FormData();
    formData.append("name",values.name);
    formData.append("email",values.email);
    formData.append("phoneNo",values.phoneNo);
    formData.append("address1",values.address1);
    formData.append("address2",values.address2);
    formData.append("memberNo",values.memberNo);
    return post(url, formData);
  }

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
          subheader="The information can be edited"
          title="Profile"
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
                helperText="Please specify the first name"
                label="User Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name || ''}
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
                label="Email Address"
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
                label="Phone Number"
                margin="dense"
                name="phoneNo"
                onChange={handleChange}
                //type="number"
                value={values.phoneNo || ''}
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
                label="Select State"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={4}
              xs={8}
            >
              <TextField
                fullWidth
                label="Country"
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
                label="Country"
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
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
