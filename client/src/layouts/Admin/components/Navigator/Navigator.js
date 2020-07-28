import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { List, ListItem, ListItemIcon, ListItemText, Button, Divider, Drawer, colors } from '@material-ui/core';
import { post } from 'axios';

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.h5.fontWeight,
    '& $icon': {
      color: theme.palette.primary.main
    },
  },
  button: {
    color: colors.blueGrey[50],
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.h5.fontWeight
  },
});

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const Navigator = props => {
  const { classes, ...rest } = props;

  const [menuState, setMenuState] = useState({
    menu: [],
    subMenu: []
  });

  useEffect(() => {
      post('/bkmenu/menuList')
          .then(res => {
              const menuList = res.data.menuList;
              const menuArr = [];
              const subArr = [];

              for (let i = 0; i < menuList.length; i++) {
                  if (menuList[i].upperMenuCd) {
                      subArr.push(menuList[i]);
                  } else {
                      menuArr.push(menuList[i]);
                  }
              }

              setMenuState({
                  menu: menuArr,
                  subMenu: subArr
              });
          })
          .catch(err => {
              throw(err);
          })
  }, []);

  return (
    <Drawer variant="permanent" {...rest}>
      <List disablePadding>
          <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
            관리자 시스템
          </ListItem>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <Button
            activeStyle={{
              fontWeight: "bold",
              color: "#4fc3f7"
            }}
            className={classes.button}
            component={CustomRouterLink}
            to='/admin'
            exact
          >
            <ListItemIcon className={classes.itemIcon}>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText
                classes={{
                primary: classes.itemPrimary,
                }}
            >
              Home
            </ListItemText>
          </Button>
          </ListItem>
          {menuState.menu.map(( item, index ) => (
            
            <React.Fragment key={index}>
              
                <ListItem className={classes.categoryHeader}>
                  <ListItemText
                      classes={{
                      primary: classes.categoryHeaderPrimary,
                      }}
                  >
                    {item.menuNm}
                  </ListItemText>
                </ListItem>
                <List component='div' disablePadding>
                {menuState.subMenu.map(( sub, index ) => {
                  return (
                    <div key={index}>
                      {item.menuCd === sub.upperMenuCd
                        ?
                        <ListItem>
                          <Button
                            activeStyle={{
                              fontWeight: "bold",
                              color: "#4fc3f7"
                            }}
                            className={classes.button}
                            component={CustomRouterLink}
                            to={sub.pathSrc}
                            exact
                          >
                            <ListItemIcon className={classes.itemIcon}>ㆍ</ListItemIcon>
                            {sub.menuNm}
                          </Button>
                        </ListItem>
                        :
                        null
                      }
                    </div>
                  )
                })}
                </List>
                <Divider className={classes.divider} />
            </React.Fragment>
            
          ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);