import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors, ListItemIcon, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  expandItem: {
    paddingLeft: '4%'
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: '#f50057',
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  logout: {
    color: '#37474f'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItem: {
    fontWeight: 'bold'
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { menuList, className, ...rest } = props;

  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState('');
  const [upperMenuCd, setUpperMenuCd] = useState('');

  const handleClick = (index, menuCd) => {
    if (selectedIndex === index) {
      setSelectedIndex('');
      setUpperMenuCd('');
    } else {
      setSelectedIndex(index);
      setUpperMenuCd(menuCd);
    }
  };

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {menuList.menu.map((item, index) => (
        <List key={index}>
          {item.pathSrc
            ?
            <ListItem disableGutters className={classes.item}>
              <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  to={item.pathSrc}
                >
                  <ListItemIcon>
                    <div className={classes.icon}><img src={item.menuIcon} alt="menu icon"></img></div>
                  </ListItemIcon>
                  <div className={classes.listItem}>{item.menuNm}</div>
                </Button>
            </ListItem>
            :
            <ListItem className={classes.expandItem} button onClick={() => handleClick(index, item.menuCd)} disableGutters>
              <ListItemIcon>
                <div className={classes.icon}><img src={item.menuIcon} alt="menu icon"></img></div>
              </ListItemIcon>
              <div className={classes.listItem}>{item.menuNm}</div>
              {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          }
            
          <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
            <List component='div' disablePadding>
              {menuList.subMenu.map((sub, index) => {
                return (
                  <div key={index}>
                    {sub.upperMenuCd === upperMenuCd
                      ?
                      <ListItem className={classes.nested}>
                        <Button
                          activeClassName={classes.active}
                          className={classes.button}
                          component={CustomRouterLink}
                          to={sub.pathSrc}
                        >
                          <ListItemIcon>
                            <img src={sub.menuIcon} alt="menu icon"></img>
                          </ListItemIcon>
                          <div className={classes.listItem}>{sub.menuNm}</div>
                        </Button>
                      </ListItem>
                      :
                      null
                    }
                  </div>
                )
              })}
            </List>
          </Collapse>
        </List> 
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  menuList: PropTypes.object.isRequired
};

export default SidebarNav;
