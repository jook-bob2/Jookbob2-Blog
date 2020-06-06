import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import {post} from 'axios';
import validate from 'validate.js';

const useStyles = makeStyles(theme => ({
  root: {},
  btn: {
    padding: "16px"
  }
}));

const schema = {
  password: {
    presence: { allowEmpty: true },
    length: {
      maximum: 12
    }
  },
  confirm: {
    presence: { allowEmpty: true },
    length: {
      maximum: 12
    },
    equality: "password"
  }
};   

const Password = props => {
  const { className } = props;

  const classes = useStyles();

  const [state, setState] = useState({
    values: {},
    errors: {},
    isValid: false,
    touched: {}
  });

  useEffect(() => {
    const errors = validate(state.values, schema);
    setState(state => ({
      ...state,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [state.values]);

  const handleChange = event => {
    event.persist();
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
      values: {
        ...state.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...state.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let passwd = state.values.password;
    let confirm = state.values.confirm;
    console.log(passwd + ", " + confirm);
    if(passwd !== confirm) {
      alert("비밀번호를 확인해주세요.");
      document.getElementsByName('password')[0].focus();
      return false;
    }

    updatePw(e)
      .then(res => {
        if (res.data) {
          alert("패스워드가 변경 되었습니다.");
          setState(state => ({
            ...state,
            values: {
              ...state.values,
              password: '',
              confirm: ''
            }
          }));
        }
      })
  };

  const updatePw = (e) => {
    const url = "/member/updatePw";
    const formData = new FormData();
    formData.append("passwd", state.values.password);
    return post(url, formData);
  }

  const hasError = field => 
        state.touched[field] && state.errors[field] ? true : false;

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={state.values.password || ''}
            variant="outlined"
            error={hasError('password')}
            helperText= {
              hasError('password') ? state.errors.password[0] : null
            }
          />
          <TextField
            fullWidth
            label="Confirm password"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={state.values.confirm || ''}
            variant="outlined"
            error={hasError('confirm')}
            helperText= {
              hasError('confirm') ? state.errors.confirm[0] : null
            }
          />
        </CardContent>
        <Divider />
        <CardActions className={classes.btn}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
