import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        float: 'left'
    }
}));

const Footer = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Typography variant="body1">
                &copy;{' '}
                <Link
                    component="a"
                    href="https://github.com/ehrmaks/"
                    target="_blank"
                >
                    Github
                </Link>
                {' '}&copy;{' '}
                <Link
                    component="a"
                    href={'/admin'}
                >
                    Admin
                </Link>
                
                . 2020
            </Typography>
            <Typography variant="caption">
                These are spring boot and react that I personally made.
            </Typography>
        </div>
    );
};

Footer.propTypes = {
    className: PropTypes.string
};

export default Footer;