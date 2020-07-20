import React, { forwardRef, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
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
    color: theme.palette.primary.main,
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
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const handleClick = (index, title) => {
    if (selectedIndex === index) {
      setSelectedIndex('');
      setSubTitle('');
    } else {
      setSelectedIndex(index);
      setSubTitle(title);
    }
  };

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.menu.map((item, index) => (
        <List key={index}>
          {item.haveSub !== 'Y'
            ?
            <ListItem disableGutters className={classes.item}>
              <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  to={item.href}
                >
                  <ListItemIcon>
                    <div className={classes.icon}>{item.icon}</div>
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </Button>
            </ListItem>
            :
            <ListItem className={classes.expandItem} button onClick={() => handleClick(index, item.title)} disableGutters>
              <ListItemIcon>
                <div className={classes.icon}>{item.icon}</div>
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          }
            
          <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
            <List component='div' disablePadding>
              {pages.subMenu.map((sub, index) => {
                return (
                  <div key={index}>
                    {sub.subTitle === subTitle
                      ?
                      <ListItem className={classes.nested}>
                        <Button
                          activeClassName={classes.active}
                          className={classes.button}
                          component={CustomRouterLink}
                          to={sub.href}
                        >
                          <ListItemIcon>
                            {sub.icon}
                          </ListItemIcon>
                          {sub.title}
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
  pages: PropTypes.object.isRequired
};

export default SidebarNav;
