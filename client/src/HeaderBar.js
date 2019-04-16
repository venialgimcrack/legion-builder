import React from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const HeaderBar = props => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Legion List Builder
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = state => {
    const { login } = state;

    return {
        username: login.user.name,
        isLoggedIn: login.auth
    };
};

const mapDispatchToProps = {};

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
};

const connected = connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
export default withStyles(styles)(connected);
