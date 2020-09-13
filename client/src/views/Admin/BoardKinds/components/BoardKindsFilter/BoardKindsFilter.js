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
import { getBoardKindsListing, getBoardKindsPaging, getBoardKindsFiltering } from 'store/actions/admin/boardKindsList';

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

const BoardKindsFilter = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        brdCode: '',
        showText: '',
        brdText: '',
        createStartDate: '',
        createEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
        boardKindsState: ''
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

        dispatch(getBoardKindsListing(state, 1, 5));
        dispatch(getBoardKindsFiltering(state));
        dispatch(getBoardKindsPaging(1));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item
                    
                    xs={10}>
                    <Card>
                        <form>
                            <CardHeader
                                title="게시판종류 목록"
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
                                        <h3>종류코드 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="종류코드"
                                            margin="dense"
                                            name="brdCode"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>게시판이름 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="게시판이름"
                                            margin="dense"
                                            name="showText"
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
                                        <h3>게시판경로 :</h3>
                                    </Grid>

                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <TextField
                                            label="게시판경로"
                                            margin="dense"
                                            name="brdText"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid
                                        className={classes.textGrid}
                                        item
                                        md={2}
                                        xs={4}
                                    >
                                        <h3>게시판종류 상태 :</h3>
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={8}
                                    >
                                        <FormControl>
                                            <InputLabel id="selectBrdKindsStateLabel">선택하세요.</InputLabel>
                                            <Select
                                                labelId="selectBrdKindsStateLabel"
                                                className={classes.select}
                                                name="boardKindsState"
                                                value={state.boardKindsState}
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

export default BoardKindsFilter;

