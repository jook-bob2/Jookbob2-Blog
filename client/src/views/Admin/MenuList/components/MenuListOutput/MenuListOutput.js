import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination';
import MenuListTable from './MenuListTable/MenuListTable';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuListing, getMenuPaging } from 'store/actions/admin/menuList';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 50
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
    }
}));

const MenuListOutput = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const menuList = useSelector(state => state.menuList) || '';
    const filterValues = useSelector(state => state.menuFilter) || '';
    const page = useSelector(state => state.menuListPage.page) || 1;

    const itemsPerPage = 5;
    
    const [progress, setProgress] = useState(0);
    const [noOfPages, setNoOfPages] = useState(0);

    useEffect(() => {
        if (filterValues === '') {
            dispatch(getMenuListing(false, page, itemsPerPage));
        } else {
            dispatch(getMenuListing(filterValues.values, page, itemsPerPage));
        }
    }, [dispatch, page, filterValues]);

    useEffect(() => {
        const timer = setInterval(progressCount, 20);
        
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setNoOfPages(Math.ceil(menuList.menuCnt / itemsPerPage));
    }, [menuList.menuCnt]);

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

    return (
        <div className={classes.root}>
            <h3 className={classes.paper}>
                ★ {menuList.menuCnt}개의 메뉴가 조회 되었습니다.
            </h3>
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
        </div>
    );
};

export default MenuListOutput;
