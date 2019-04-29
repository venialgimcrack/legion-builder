import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const icons = {
    success: CheckCircleIcon,
    error: ErrorIcon,
    info: InfoIcon,
    warning: WarningIcon
};

const MessageBarContent = props => {
    const { classes, className, message, onClose, variant, ...other } = props,
        Icon = icons[variant];
    
    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            message={
                <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={ onClose ?
                [
                    <IconButton color="inherit" className={classes.close} onClick={onClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ] : []
            }
            {...other}
        />
    );
};

const styles = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
});

export default withStyles(styles)(MessageBarContent);
