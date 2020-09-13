import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Grid, 
    Card,
    CardActions,
    CardContent,
    Avatar,
    Divider,
    Button ,
    CardHeader,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent
} from '@material-ui/core';
import { post } from 'axios';
import validate from 'validate.js';
import DaumPostcode from 'react-daum-postcode';

const schema = {
    password: {
      presence: { allowEmpty: true },
      length: {
        maximum: 12
      },
    },
    confirm: {
      presence: { allowEmpty: true },
      length: {
        maximum: 12
      },
      equality: "password"
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        //flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        height: 110,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    details: {
        display: 'flex',
        placeContent: 'center',
    },
    hidden: {
        display: 'none'
    },
    cardAction: {
        placeContent: 'center'
    },
    addressBtn: {
        padding: 10
    },
    label: {
        marginRight: 8
    }
}));
  

const AdminRegistration = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        file: null,
        fileName: '',
        avatar: '',
        open: false
    });

    const [values, setValues] = useState({
        adminId: '',
        name: '',
        email: '',
        phoneNo: '',
        address1: '',
        address2: '',
        postNo: ''
    });

    const [passwordState, setPassword] = useState({
        values: {},
        errors: {},
        isValid: false,
        touched: {}
    });

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);

    useEffect(() => {
        const errors = validate(passwordState.values, schema);
        setPassword(passwordState => ({
            ...passwordState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [passwordState.values]);

    const handleFileChange = (e) => {
        e.preventDefault();
        addPicture(e)
        .then(res => {
            setState(state => ({
                ...state,
                avatar: res.data.profileImg
            }));
        })
        .catch(err => console.log(err));
    };

    const addPicture = (e) => {
        const url = '/admin/uploadPicture';
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        if (state.avatar !== '')
            formData.append('profileImg', state.avatar);

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
                setState(state => ({
                    ...state,
                    avatar: ''
                }));
            });
    };

    const removePicture = () => {
        const url = '/admin/removePicture';
        const formData = new FormData();
        formData.append('profileImg', state.avatar);
        return post(url, formData);
    }

    const handleSubmit = event => {
        event.preventDefault();
        
        registration()
            .then(res => {
                const result = res.data;
                if (result === 1) {
                    alert("등록이 완료 되었습니다.");
                    window.location.reload();
                } else if (result === -1) {
                    alert("아이디가 중복 됩니다.");
                } else if (result === -2) {
                    alert("이메일이 중복 됩니다.");
                } else if (result === -3) {
                    alert("연락처가 중복 됩니다.");
                }
            })
            .catch(err => {
                throw(err);
            })
    }

    const registration = () => {
        const url = "/admin/registration";
        const formData = new FormData();
        formData.append("name",values.name);
        formData.append("email",values.email);
        formData.append("phoneNo",values.phoneNo);
        formData.append("address1",values.address1);
        formData.append("address2",values.address2);
        formData.append("adminId",values.adminId);
        formData.append("postNo",values.postNo);
        formData.append("passwd",passwordState.values.password);
        formData.append("profileImg",state.avatar);
        return post(url, formData);
    }

    const handleCancel = () => {
        if (state.avatar !== '')
            handleFileRemove();
        window.location.reload();
    }

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handlePasswordChange = event => {
        event.persist();
        setPassword(passwordState => ({
          ...passwordState,
          [event.target.name]: event.target.value,
          values: {
            ...passwordState.values,
            [event.target.name]: event.target.value
          },
          touched: {
            ...passwordState.touched,
            [event.target.name]: true
          }
        }));
    };

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

        setState(state => ({
            ...state,
            open: false
        }));   
    }

    const handleClose = () => {
        setState(state => ({
            ...state,
            open: false
        }));
    };

    const handleOpenMap = () => {
        setState(state => ({
            ...state,
            open: true
        }))
    }

    const hasError = field => 
        passwordState.touched[field] && passwordState.errors[field] ? true : false;
    
    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid 
                    item
                    lg={2}
                    md={3}
                    xl={2}
                    xs={4}
                >
                    <Card>
                        <CardContent>
                            <div className={classes.details}>
                                <Avatar className={classes.avatar} src={state.avatar} />
                            </div>
                        </CardContent>
                    
                        <Divider />
                        <CardActions className={classes.cardAction}>
                            <input className={classes.hidden} type="file" accept="image/*" id="raised-button-file" file={state.file} value={state.fileName} onChange={handleFileChange}></input>
                            <label htmlFor="raised-button-file" className={classes.label}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    component="span" 
                                    name="file"
                                >
                                    {state.avatar === "" ? "등록" : "수정"}
                                </Button>
                            </label>
                            {state.avatar === "" ? null : <Button variant="outlined" color="secondary" onClick={handleFileRemove}>삭제</Button>}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader
                                title="관리자 등록"
                                subheader="아래 내용을 입력해주세요."
                            />
                            <Divider />
                            <CardContent className={classes.cardAction}>
                                <Grid
                                    container
                                >
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            fullWidth
                                            label="아이디"
                                            margin="dense"
                                            name="adminId"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    spacing={4}
                                >
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            fullWidth
                                            label="비밀번호"
                                            name="password"
                                            margin="dense"
                                            onChange={handlePasswordChange}
                                            type="password"
                                            variant="outlined"
                                            error={hasError('password')}
                                            helperText= {
                                                hasError('password') ? passwordState.errors.password[0] : null
                                            }
                                            required
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            fullWidth
                                            label="비밀번호 확인"
                                            name="confirm"
                                            margin="dense"
                                            onChange={handlePasswordChange}
                                            type="password"
                                            variant="outlined"
                                            error={hasError('confirm')}
                                            helperText= {
                                                hasError('confirm') ? passwordState.errors.confirm[0] : null
                                            }
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                
                                <Grid
                                    container
                                >
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            fullWidth
                                            label="이름"
                                            margin="dense"
                                            name="name"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                >
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            fullWidth
                                            label="이메일"
                                            margin="dense"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                >
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
                                            type="number"
                                            onChange={handleChange}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
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
                                            variant="outlined"
                                            value={values.address1}
                                            onClick={handleOpenMap}
                                            required
                                        />
                                    </Grid>
                                    <div className={classes.addressBtn}>
                                        <Button 
                                            color="primary"
                                            variant="contained"
                                            onClick={handleOpenMap}
                                        >
                                            주소찾기
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid
                                    container
                                    spacing={4}
                                >
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
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
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
                                            value={values.postNo}
                                            onChange={handleChange}
                                            variant="outlined"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.cardAction}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    등록
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={handleCancel}
                                >
                                    취소
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            

            <Dialog
                open={state.open}
                onClose={handleClose}
            >
                <DialogTitle>주소찾기</DialogTitle>
                <Divider />
                <DialogContent>
                    <DaumPostcode onComplete={handleComplete}/>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminRegistration;
