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
import { getMenuListing, getMenuFiltering, getMenuPaging } from 'store/actions/admin/menuList';

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

const MenuFilter = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        menuCd: '',
        upperMenuCd: '',
        menuLvl: '',
        menuNm: '',
        menuOrdr: '',
        pathSrc: '',
        createStartDate: '',
        createEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
        menuState: ''
    });

    const [stateOpen, setStateOpen] = useState(false);

    const handleBrdStateClose = () => {
        setStateOpen(false);
    };
    
    const handleBrdStateOpen = () => {
        setStateOpen(true);
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

        dispatch(getMenuListing(state, 1, 5));
        dispatch(getMenuFiltering(state));
        dispatch(getMenuPaging(1));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item
                    
                    xs={10}>
                    <Card>
                        <form>
                            <CardHeader
                                title="메뉴 목록"
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
                                        <h3>메뉴코드 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="메뉴코드"
                                            margin="dense"
                                            name="menuCd"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>상위메뉴코드 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="상위메뉴코드"
                                            margin="dense"
                                            name="upperMenuCd"
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
                                        <h3>메뉴이름 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="메뉴이름"
                                            margin="dense"
                                            name="menuNm"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>메뉴레벨 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="메뉴레벨"
                                            margin="dense"
                                            name="menuLvl"
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
                                        <h3>메뉴경로 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="메뉴경로"
                                            margin="dense"
                                            name="pathSrc"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>메뉴순서 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="메뉴순서"
                                            margin="dense"
                                            name="menuOrdr"
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
                                            name="createStartDate"
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
                                            name="createEndDate"
                                            value={state.endDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                    >
                                        <h3>공지사항 상태 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                    >
                                        <FormControl>
                                            <InputLabel id="selectBrdStateLabel">선택하세요.</InputLabel>
                                            <Select
                                                labelId="selectBrdStateLabel"
                                                className={classes.select}
                                                name="menuState"
                                                value={state.menuState}
                                                onChange={handleChange}
                                                open={stateOpen}
                                                onClose={handleBrdStateClose}
                                                onOpen={handleBrdStateOpen}
                                            >
                                                <MenuItem value=''>선택하세요.</MenuItem>
                                                <MenuItem value='DelY'>삭제됨</MenuItem>
                                                <MenuItem value='DelN'>삭제안됨</MenuItem>
                                                <MenuItem value='UpdateY'>수정됨</MenuItem>
                                                <MenuItem value='UpdateN'>수정안됨</MenuItem>
                                            </Select>
                                        </FormControl>
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
                                        <h3>수정일 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={2}
                                    >
                                        <TextField
                                            className={classes.dateField}
                                            margin="dense"
                                            type="date"
                                            name="updateStartDate"
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
                                            name="updateEndDate"
                                            value={state.endDate}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                    >
                                        
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                    >
                                        
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

export default MenuFilter;

