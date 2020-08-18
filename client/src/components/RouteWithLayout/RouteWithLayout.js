import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(theme => ({
  tableCell: {
    paddingTop: '22%',
    borderBottom: '#ffffff'
  }
}));

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, fallback: Fallback, isAllow, admin, user, ...rest } = props;
  const classes = useStyles();
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(progressCount, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressCount = () => {
    setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
  };

  return (
    <Route
      {...rest}
      render={matchProps => {
        if (isAllow === undefined) {
          return (
            <Table>
              <TableBody>
                  <TableRow>
                      <TableCell className={classes.tableCell} colSpan="9" align="center">
                          <CircularProgress variant="determinate" value={progress}></CircularProgress>
                      </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          );
        } else {
          if (!isAllow && admin) {
            return <Fallback />
          } else if (!isAllow && user) {
            return <Fallback />
          } else {
            return <Layout>
                <Component {...matchProps} />
              </Layout>
          }
        }
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
