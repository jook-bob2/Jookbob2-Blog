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
    MenuItem
} from '@material-ui/core';

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

const AdminFilter = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        startDate: '',
        endDate: '',
        adminState: ''
    });

    const handleChange = (event) => {
        console.log(event.target.value);
        setState(state => ({
            ...state,
            [event.target.name] : event.target.value
        }));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item
                    
                    xs={10}>
                    <Card>
                        <form>
                            <CardHeader
                                title="관리자 목록"
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
                                        <h3>관리자 상태 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                    >
                                        <Select
                                            labelId="admin-state"
                                            className={classes.select}
                                            labelWidth={10}
                                            //id="demo-simple-select"
                                            name="adminState"
                                            value={state.adminState}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>사용함</MenuItem>
                                            <MenuItem value={10}>사용안함</MenuItem>
                                            <MenuItem value={20}>탈퇴함</MenuItem>
                                            <MenuItem value={30}>탈퇴안함</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.button}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
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

export default AdminFilter;

