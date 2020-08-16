import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
//import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { post } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminAuth } from 'store/actions/admin/adminList';
import { Typography } from '@material-ui/core';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

const Header = (props) => {
    const { classes, onDrawerToggle } = props;

    const dispatch = useDispatch();

    const [state, setState] = useState({
      avatar: '',
      userName: '',
      adminId: ''
    });

    useEffect(() => {
      post(`/admin/viewAdmin`)
        .then(res => {
          const data = res.data.data;
          setState({
            avatar: data.profileImg,
            userName: data.name,
            adminId: data.adminId
          })
        })
        .catch(err => {
          throw(err);
        })
    }, []);

    const handleLogout = () => {
      post(`/admin/logout`)
        .then(window.location.href = '/admin/sign-in')
        .catch(err => {
          throw(err);
        });
    };

    useEffect(() => {
        dispatch(getAdminAuth());
    }, [dispatch]);

    const adminSession = useSelector(state => state.adminAuth, []) || [];
    const adminAuth = adminSession.authenticated;

    return (
        <React.Fragment>
          <AppBar color="primary" position="sticky" elevation={0}>
              <Toolbar>
              <Grid container spacing={1} alignItems="center">
                  <Hidden smUp>
                  <Grid item>
                      <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={onDrawerToggle}
                      className={classes.menuButton}
                      >
                      <MenuIcon />
                      </IconButton>
                  </Grid>
                  </Hidden>
                  <Grid item xs />
                  <Grid item>
                  <Tooltip title="Alerts • No alerts">
                      <IconButton color="inherit">
                      <NotificationsIcon />
                      </IconButton>
                  </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="관리자 수정 화면으로 이동합니다.">
                      <IconButton color="inherit" className={classes.iconButtonAvatar} onClick={() => window.location.href = `/admin-update/${state.adminId}`}>
                          <Avatar src={state.avatar} alt="My Avatar" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Typography color="inherit" variant="h6" component="h6">
                      {state.userName}님
                    </Typography>
                  </Grid>
              </Grid>
              </Toolbar>
          </AppBar>
          <AppBar
              component="div"
              className={classes.secondaryBar}
              color="primary"
              position="static"
              elevation={0}
          >
              <Toolbar>
              <Grid container alignItems="center" spacing={1}>
                  <Grid item xs>
                  {/* <Typography color="inherit" variant="h5" component="h1">
                      Authentication
                  </Typography> */}
                  </Grid>
                  <Grid item>
                    <Tooltip title="사용자 화면으로 이동합니다.">
                      <Button className={classes.button} variant="outlined" color="inherit" size="small" onClick={() => window.location.href = "/"}>
                          사용자 페이지
                      </Button>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    {adminAuth 
                      ?
                      <Button className={classes.button} variant="outlined" color="inherit" size="small" onClick={handleLogout}>
                          로그아웃
                      </Button>
                      :
                      null
                    }
                  </Grid>
              </Grid>
              </Toolbar>
          </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);