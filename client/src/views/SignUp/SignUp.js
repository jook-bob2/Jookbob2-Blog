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
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
    userId: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        minimum: 4,
        maximum: 12
      },
      format: {
          pattern: "^[a-zA-Z0-9]{4,12}$",
          message: "can only contain a-z/A-Z/0-9"
      }
    },
    userName: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        minimum: 2,
        maximum: 32,
      },
      format: {
          pattern: "^[a-zA-Z가-힣\\s]*$",
          message: "can only contain a-z/A-Z/가-힣"
      }
    },
    email: {
      presence: { allowEmpty: false, message: 'is required' },
      email: true,
      length: {
        maximum: 64
      }
    },
    password: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 12
      }
    },
    confirmPw: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 12
      },
      equality: "password"
    },
    policy: {
      presence: { allowEmpty: false, message: 'is required' },
      checked: true
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
    textField: {
      marginTop: theme.spacing(2)
    },
    policy: {
      marginTop: theme.spacing(1),
      display: 'flex',
      alignItems: 'center'
    },
    policyCheckbox: {
      marginLeft: '-14px'
    },
    signUpButton: {
      margin: theme.spacing(2, 0)
    }
  }));

  const SignUp = props => {
    const { history } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);

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

    const handleBack = () => {
        history.goBack();
    };

    const handleSignUp = event => {
        event.preventDefault();
        
        goSignUp()
            .then((response) => {
                let data = response.data;
                if (data === '/sign-in') {
                    alert("회원가입을 축하 합니다.\n로그인 페이지로 이동합니다.");
                    history.push(response.data);
                }
                else if (data === 'id') {
                    alert("아이디가 중복 됩니다.");
                    document.getElementsByName('userId')[0].focus();
                } 
                else if (data === 'email') {
                    alert("이메일이 중복 됩니다.");
                    document.getElementsByName('email')[0].focus();
                }
            });
    };

    const goSignUp = () => {
        const url = "member/join";
        const formData = new FormData();
        formData.append('formData' , JSON.stringify(formState.values));
        
        return post(url, formData);
    };

    const hasError = field => 
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.grid}
                    item
                    lg={5}
                >
                    <div className={classes.quote}>
                        <div className={classes.quoteInner}>
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
                                    JS Kim
                                </Typography>
                                <Typography
                                    className={classes.bio}
                                    variant="body2"
                                >
                                    Manager at inVision
                                </Typography>
                            </div>
                        </div>
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
                                onSubmit={handleSignUp}
                            >
                                <Typography
                                    className={classes.title}
                                    variant="h3"
                                >
                                    Create new account
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Use your email to create new account
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('userId')}
                                    fullWidth
                                    helperText= {
                                        hasError('userId') ? formState.errors.userId[0] : null
                                    }
                                    label="User Id"
                                    name="userId"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.userId || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('password')}
                                    fullWidth
                                    helperText= {
                                        hasError('password') ? formState.errors.password[0] : null
                                    }
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('confirmPw')}
                                    fullWidth
                                    helperText= {
                                        hasError('confirmPw') ? formState.errors.confirmPw[0] : null
                                    }
                                    label="Confirm password"
                                    name="confirmPw"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.confirmPw || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('userName')}
                                    fullWidth
                                    helperText={
                                        hasError('userName') ? formState.errors.userName[0] : null
                                    }
                                    label="User name"
                                    name="userName"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.userName || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('email')}
                                    fullWidth
                                    helperText={
                                        hasError('email') ? formState.errors.email[0] : null
                                    }
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    type="email"
                                    value={formState.values.email || ''}
                                    variant="outlined"
                                />
                                <div className={classes.policy}>
                                    <Checkbox
                                        checked={formState.values.policy || false}
                                        className={classes.policyCheckbox}
                                        color="primary"
                                        name="policy"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        className={classes.policyText}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        I have read the{' '}
                                        <Link
                                            color="primary"
                                            component={RouterLink}
                                            to="#"
                                            underline="always"
                                            variant="h6"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </Typography>                            
                                </div>
                                {hasError('policy') && (
                                    <FormHelperText error>
                                        {formState.errors.policy[0]}
                                    </FormHelperText>
                                )}
                                <Button
                                    className={classes.signUpButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign up now
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Have an account?{' '}
                                    <Link
                                        component={RouterLink}
                                        to="/sign-in"
                                        variant="h6"
                                    >
                                        Sign in
                                    </Link>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

SignUp.propTypes = {
    history: PropTypes.object
};

export default withRouter(SignUp);