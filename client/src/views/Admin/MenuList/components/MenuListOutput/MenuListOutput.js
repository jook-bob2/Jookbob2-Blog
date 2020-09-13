import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import MenuListTable from './MenuListTable/MenuListTable';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuListing, getMenuPaging, getMenuFiltering } from 'store/actions/admin/menuList';
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions
} from '@material-ui/core';
import { post } from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 50
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        margin: '18px'
    },
    paper: {
        paddingTop: 10,
        paddingBottom: 10
    },
    progress: {
        margin: 'theme.spacing.unit * 2'
    },
    pagination: {
        padding: 10,
        paddingTop: 20,
    },
    paginationUl: {
        justifyContent: 'center'
    },
    tableHead: {
        fontWeight: 'bold',
        fontSize: 'initial'
    },
    createContent: {
        padding: 20
    },
    createInput: {
        width: '100%',
        height: 21,
        backgroundColor: 'ivory',
        border: '1px solid skyblue',
        fontFamily: 'initial',
        fontSize: '10pt',
        color: 'red',
        textAlign: 'center',
    },
    createDiv: {
        width: '100%',
        height: 325,
        border: '1px solid #000'
    },
    left: {
        width: '50%',
        float: 'left',
        boxSizing: 'border-box'
    }, 
    right : {
        width: '50%',
        float: 'right',
        boxSizing: "border-box"
    },
    createSelect: {
        width: '100%',
        border: '1px solid skyblue',
        height: 25,
        backgroundColor: 'ivory',
        color: 'red'
    },
    selectWt: {
        width: 150,
        textAlign: 'center',
        fontWeight: 'bold',
        height: 35
    },
    pageDiv: {
        padding: 20,
        marginBottom: 10,
        textAlign: 'right',
        marginRight: '10%'
    },
    selectLable:{
        fontSize: '15pt',
        fontWeight: 'bold'
    }
}));

const MenuListOutput = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [createState, setCreateState] = useState({
        menuCd: '',
        upperMenuCd: '',
        menuNm: '',
        menuLvl: '',
        menuOrdr: '',
        pathSrc: '',
        menuType: ''
    });

    const menuList = useSelector(state => state.menuList) || '';
    const filterValues = useSelector(state => state.menuFilter) || '';
    const page = useSelector(state => state.menuListPage.page) || 1;

    const [itemsPerPage, setItemPerPage] = useState(5);
    const [pageOpen, setPageOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [noOfPages, setNoOfPages] = useState(0);
    const [createOpen, setCreateOpen] = useState(false);

    useEffect(() => {
        if (filterValues === '') {
            dispatch(getMenuListing(false, page, itemsPerPage));
        } else {
            dispatch(getMenuListing(filterValues.values, page, itemsPerPage));
        }
    }, [dispatch, page, filterValues, itemsPerPage]);

    useEffect(() => {
        const timer = setInterval(progressCount, 20);
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setNoOfPages(Math.ceil(menuList.menuCnt / itemsPerPage));
    }, [itemsPerPage, menuList.menuCnt]);

    const progressCount = () => {
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const callbackComponents = (data) => {
        return data.map((c, index) => {
            return <MenuListTable
                key={index} 
                menuCd={c.menuCd} upperMenuCd={c.upperMenuCd} menuNm={c.menuNm} menuLvl={c.menuLvl} menuOrdr={c.menuOrdr} pathSrc={c.pathSrc}
                createDt={c.createDt} updateDt={c.updateDt} delYn={c.delYn} updateYn={c.updateYn}
                page={page} itemsPerPage={itemsPerPage}
            />
        })
    }

    const handlePaging = (e, value) => {
        dispatch(getMenuPaging(value));
        
        if (filterValues === '') {
            dispatch(getMenuListing(false, value, itemsPerPage));
        } else {
            dispatch(getMenuListing(filterValues.values, value, itemsPerPage));
        }
    }

    const handleCreateChange = (event) => {
        event.persist();
        console.log(event.target.value);
        setCreateState(createState => ({
            ...createState,
            [event.target.name]: event.target.value
        }));
    }

    const handleCreateClose = () => {
        setCreateOpen(false);
    }

    const handleCreateOpen = () => {
        setCreateOpen(true);
    }

    const createMenu = (event) => {
        event.preventDefault();

        const formData = new FormData();

        if (createState.menuCd === '') {
            alert('메뉴코드를 입력해주세요.');
            return false;
        } else if (createState.menuLvl === '') {
            alert('메뉴레벨을 입력해주세요.');
            return false;
        } else if (createState.menuOrdr === '') {
            alert('메뉴순서를 입력해주세요.');
            return false;
        } else if (createState.menuNm === '') {
            alert('메뉴이름을 입력해주세요.');
            return false;
        } else if (createState.menuType === '') {
            alert('메뉴아이콘을 선택해주세요.');
            return false;
        }
        
        formData.append('menuCd', createState.menuCd);
        formData.append('menuLvl', Number(createState.menuLvl));
        formData.append('menuNm', createState.menuNm);
        formData.append('menuOrdr', Number(createState.menuOrdr));
        formData.append('upperMenuCd', createState.upperMenuCd);
        formData.append('pathSrc', createState.pathSrc);
        formData.append('menuType', createState.menuType);

        post(`/menu/createMenu`, formData)
            .then(res => {
                if (res.data === 'succeed') {
                    setCreateOpen(false);
    
                    dispatch(getMenuListing(null, page, 5));
                    dispatch(getMenuFiltering());
                    dispatch(getMenuPaging(page));
                } else if (res.data === 'error') {
                    alert('메뉴코드가 중복 됩니다.');
                } else if (res.data === 'dupPath') {
                    alert('메뉴경로가 중복 됩니다.');
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    const handleChange = (event) => {
        event.persist();
        setItemPerPage(event.target.value);
        dispatch(getMenuPaging(page));

        if (filterValues === '') {
            dispatch(getMenuListing(false, page, event.target.value));
        } else {
            dispatch(getMenuListing(filterValues.values, page, event.target.value));
        }
    };

    const handlePageClose = () => {
        setPageOpen(false);
    };

    const handlePageOpen = (event) => {
        event.preventDefault();
        
        setPageOpen(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <h3 className={classes.paper}>
                    ★ {menuList.menuCnt}개의 메뉴가 조회 되었습니다.
                    &nbsp;&nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateOpen}
                    >
                        메뉴등록
                    </Button>
                </h3>
                <div className={classes.pageDiv}>
                    <form>
                        <FormControl>
                            <InputLabel id="selectPageLabel" className={classes.selectLable}>페이지 수</InputLabel>
                            <Select
                                labelId="selectPageLabel"
                                className={classes.selectWt}
                                value={itemsPerPage}
                                onChange={handleChange}
                                open={pageOpen}
                                onClose={handlePageClose}
                                onOpen={handlePageOpen}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </div>
            </div>
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHead}>메뉴코드</TableCell>
                            <TableCell align="center" className={classes.tableHead}>상위메뉴코드</TableCell>
                            <TableCell align="center" className={classes.tableHead}>메뉴이름</TableCell>
                            <TableCell align="center" className={classes.tableHead}>메뉴레벨</TableCell>
                            <TableCell align="center" className={classes.tableHead}>메뉴순서</TableCell>
                            <TableCell align="center" className={classes.tableHead}>메뉴경로</TableCell>
                            <TableCell align="center" className={classes.tableHead}>등록일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>수정일</TableCell>
                            <TableCell align="center" className={classes.tableHead}>수정여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>삭제여부</TableCell>
                            <TableCell align="center" className={classes.tableHead}>비고</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        menuList.values ? callbackComponents(menuList.values)
                        :
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan="11" align="center">
                                    <CircularProgress className={classes.progress} variant="determinate" value={progress}></CircularProgress>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
                
                <div className={classes.pagination}>
                    <Pagination 
                        classes={{ ul: classes.paginationUl}}
                        color="primary" 
                        shape="rounded" 
                        count={noOfPages}
                        page={page}
                        onChange={handlePaging}
                        defaultPage={1}
                        showFirstButton
                        showLastButton
                    />
                </div>
            </Paper>

            <Dialog
                open={createOpen}
                onClose={handleCreateClose}
            >
                <form>
                    <DialogTitle>
                        메뉴 등록
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.createDiv}>
                            <div className={classes.left}>
                                <div className={classes.createContent}>
                                    <h4>메뉴코드</h4>
                                    <input type="text" defaultValue={createState.menuCd} name="menuCd"
                                        className={classes.createInput} onChange={handleCreateChange}></input>
                                </div>
                                <div className={classes.createContent}>
                                    <h4>상위메뉴코드</h4>
                                    <input type="text" defaultValue={createState.upperMenuCd} name="upperMenuCd"
                                        className={classes.createInput} onChange={handleCreateChange}></input>
                                </div>
                                <div className={classes.createContent}>
                                    <h4>메뉴이름</h4>
                                    <input type="text" defaultValue={createState.menuNm} name="menuNm"
                                        className={classes.createInput} onChange={handleCreateChange}></input>
                                </div>
                                <div className={classes.createContent}>
                                    <h4>메뉴유형</h4>
                                    <select defaultValue={createState.menuType} onChange={handleCreateChange} 
                                        name="menuType" className={classes.createSelect}>
                                        <option value="" selected>선택해주세요.</option>
                                        <option value="list">리스트형</option>
                                        <option value="board">게시판형</option>
                                    </select>
                                </div>
                            </div>
                            <div className={classes.right}>
                                <div className={classes.createContent}>
                                    <h4>메뉴레벨</h4>
                                    <input type="text" defaultValue={createState.menuLvl} name="menuLvl"
                                        className={classes.createInput} onChange={handleCreateChange}></input>
                                </div>
                                <div className={classes.createContent}>
                                    <h4>메뉴순서</h4>
                                    <input type="text" defaultValue={createState.menuOrdr} name="menuOrdr"
                                        className={classes.createInput} onChange={handleCreateChange}></input>
                                </div>
                                <div className={classes.createContent}>
                                    <h4>메뉴경로</h4>
                                    <input type="text" defaultValue={createState.pathSrc}  name="pathSrc"
                                        className={classes.createInput} onChange={handleCreateChange}></input>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={createMenu}
                        >
                            등록
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCreateClose}
                        >
                            닫기
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default MenuListOutput;
