import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const HomeButton = ({ to, ...props }) => {
    const Link = linkProps => <RouterLink to={to} { ...linkProps } />;
    return <Button fullWidth variant="contained" component={Link} { ...props } />;
};

const Home = ({ classes, isLoggedIn }) => {
    const LoggedIn = () => (
            <React.Fragment>
                <HomeButton to="/lists/new" className={classes.button}>New List</HomeButton>
                <HomeButton to="/lists" className={classes.button}>View Lists</HomeButton>
                <HomeButton to="/collection" className={classes.button}>View / Update Collection</HomeButton>
            </React.Fragment>
        ),
        LoggedOut = () => (
            <React.Fragment>
                <HomeButton to="/login" className={classes.button}>Login</HomeButton>
                <HomeButton to="/register" className={classes.button}>Register</HomeButton>
            </React.Fragment>
        );

    const items = isLoggedIn ? <LoggedIn /> : <LoggedOut />;

    return (
        <main className={classes.main}>
            <div className={classes.paper}>
                {items}
            </div>
        </main>
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.login.auth
    };
};

const mapDispatchToProps = {};

const connected = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [ theme.breakpoints.up(400 + theme.spacing.unit * 4) ]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit
    }
});

export default withStyles(styles)(connected);
