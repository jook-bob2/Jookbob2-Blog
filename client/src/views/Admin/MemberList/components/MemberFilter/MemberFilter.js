import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { 
    Grid, 
    Card,
    CardActions,
    CardContent,
    Divider,
    Button ,
    CardHeader,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getMemberListing, getMemberFiltering, getMemberPaging } from 'store/actions/admin/memberList';

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    button: {
        float: 'right'
    },
    grid: {
        placeContent: 'center'
    },
    textGrid: {
        textAlign: 'right',
        marginTop: 27
    },
    select: {
        width: 200,
        marginTop: 20
    },
    dateField: {
        marginTop: 25
    }
}));

const MemberFilter = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        userId: '',
        email: '',
        name: '',
        phoneNo: '',
        startDate: '',
        endDate: '',
        userState: ''
    });

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        event.persist();

        setState(state => ({
            ...state,
            [event.target.name] : event.target.value
        }));
    };

    const handleSubmit = () => {
        if (state.startDate > state.endDate) {
            alert("시작 날짜가 마지막 날짜보다 클 수 없습니다.");
            return false;
        } else if (state.startDate && state.endDate === '') {
            alert("마지막 날짜를 입력해주세요.");
            return false;
        } else if (state.endDate && state.startDate === '') {
            alert("시작 날짜를 입력해주세요.");
            return false;
        }

        dispatch(getMemberListing(state, 1, 5));
        dispatch(getMemberFiltering(state));
        dispatch(getMemberPaging(1));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item
                    
                    xs={10}>
                    <Card>
                        <form>
                            <CardHeader
                                title="회원 목록"
                                subheader="검색 내용을 입력해주세요."
                            />
                            <Divider />
                            <CardContent>
                                
                                <Grid
                                    className={classes.grid}
                                    container
                                    spacing={4}
                                >
                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>아이디 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="아이디"
                                            margin="dense"
                                            name="userId"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>이메일 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="이메일"
                                            margin="dense"
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    className={classes.grid}
                                    container
                                    spacing={4}
                                >
                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>이름 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="이름"
                                            margin="dense"
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>연락처 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="연락처"
                                            margin="dense"
                                            name="phoneNo"
                                            type="number"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    className={classes.grid}
                                    container
                                    spacing={4}
                                >
                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>등록일 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                    >
                                        <TextField
                                            className={classes.dateField}
                                            margin="dense"
                                            type="date"
                                            name="startDate"
                                            value={state.startDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        md={2}
                                    >
                                        <TextField
                                            className={classes.dateField}
                                            margin="dense"
                                            type="date"
                                            name="endDate"
                                            value={state.endDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                    >
                                        <h3>회원 상태 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                    >
                                        <FormControl>
                                            <InputLabel id="selectLabel">선택하세요.</InputLabel>
                                            <Select
                                                labelId="selectLabel"
                                                className={classes.select}
                                                name="userState"
                                                value={state.userState}
                                                onChange={handleChange}
                                                open={open}
                                                onClose={handleClose}
                                                onOpen={handleOpen}
                                            >
                                                <MenuItem value=''>선택하세요.</MenuItem>
                                                <MenuItem value='UseY'>사용함</MenuItem>
                                                <MenuItem value='UseN'>사용안함</MenuItem>
                                                <MenuItem value='SecY'>탈퇴함</MenuItem>
                                                <MenuItem value='SecN'>탈퇴안함</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.button}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    검색
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
};

export default MemberFilter;

