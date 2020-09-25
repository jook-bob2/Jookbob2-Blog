import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {post} from 'axios';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Facebook as FacebookIcon, Google as GoogleIcon } from '../../icons';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: false,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  facebooxBtn: {
    height: 45,
    width: 190,
    backgroundColor: '#3f51b5',
    color: 'beige',
    borderRadius: 5
  }
}));

const SignIn = (props) => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    
    handleLogin()
        .then((response) => {
            let param = response.data;
            if (param.userId !== null && param.userId !== "" && param.message !== "error") {
              history.goBack();
            } else {
              setOpen(true);
              document.getElementsByName("email")[0].focus();
            }
        })
    setFormState(formState => ({
        ...formState

    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleLogin = () => {
    const url = "/member/login";
    const formData = new FormData();
    formData.append('email', formState.values.email);
    formData.append('password', formState.values.password);
    return post(url, formData);
  };
  
  const googleOnSuccess = (response) => {
    const id = response.profileObj.googleId;
    const email = response.profileObj.email;
    const name = response.profileObj.name;
    const profileImg = response.profileObj.imageUrl;

    const formData = new FormData();
    formData.append('id', id);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('profileImg', profileImg);

    post(`/member/apiLogin`, formData)
      .then(res => {
        if (res.data.message !== 'error') {
          history.push('/');
        }
      })
      .catch(err => {
        throw(err);
      });
  }

  const googleOnFail = (response) => {
    alert('서버 에러 발생');
  };

  const facebookOnClick = (event) => {
  };

  const facebookCallback = (response) => {
    const id = response.id;
    const email = response.email;
    const name = response.name;
    const profileImg = response.picture.data.url;

    const formData = new FormData();
    formData.append('id', id);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('profileImg', profileImg);

    post(`/member/apiLogin`, formData)
      .then(res => {
        if (res.data.message !== 'error') {
          history.push('/');
        }
      })
      .catch(err => {
        throw(err);
      });
  };

  const handleOpenClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            {/* <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h6"
              >
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Takamaru Ayako
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Manager at inVision
                </Typography>
              </div>
            </div> */}
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h3"
                >
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Sign in with social media
                </Typography>
                <Grid
                  className={classes.socialButtons}
                  container
                  spacing={3}
                >
                  <Grid item>
                    <FacebookLogin
                      appId="700530764152041"
                      //autoLoad={true}
                      fields="name,email,picture"
                      onClick={facebookOnClick}
                      callback={facebookCallback} 
                      icon={<FacebookIcon/>}
                      cssClass={classes.facebooxBtn}
                    />
                  </Grid>
                  <Grid item>
                    <GoogleLogin
                      clientId="235232838707-352015emcjs2s2111hlgpc4b30iurfl8.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      onSuccess={googleOnSuccess}
                      onFailure={googleOnFail}
                      cookiePolicy={'single_host_origin'}
                    />
                  </Grid>
                </Grid>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email or ID
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email or ID"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  회원이 아니신가요?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>

      <Dialog
          open={open}
          onClose={handleOpenClose}
      >
          <DialogTitle>
            알림
          </DialogTitle>
          <DialogContent>
              <Typography gutterBottom>
                아이디/비밀번호를 확인 해주세요.
              </Typography>
          </DialogContent>
          <DialogActions>
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenClose}
              >
                  닫기
              </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
