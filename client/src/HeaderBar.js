import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ChevronLeft from '@material-ui/icons/ChevronLeft';

import { logout } from './actions/loginActions';

const HeaderBar = ({ classes, loggedIn, logout, location }) => {
    const path = _.get(location, 'pathname', '/'),
        HomeLink = props => <RouterLink to="/" { ...props } />,
        BackButton = () => (
            <IconButton color="inherit" component={HomeLink} className={classes.back}>
                <ChevronLeft />
            </IconButton>
        );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    { path !== '/' ? <BackButton /> : null }
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Legion List Builder
                    </Typography>
                    { loggedIn ? <Button color="inherit" onClick={logout}>Logout</Button> : null }
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = state => {
    const { login } = state;

    return {
        loggedIn: login.auth
    };
};

const mapDispatchToProps = {
    logout
};

const connected = withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderBar));

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    back: {
        marginLeft: -12
    }
};

export default withStyles(styles)(connected);
