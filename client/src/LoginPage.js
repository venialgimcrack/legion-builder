import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { login, loginClear } from './actions/loginActions';
import MessageBarContent from './MessageBarContent';

const RegisterLink = props => <RouterLink to="/register" {...props} />;

class LoginPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    showingError = () => {
        return !_.isEmpty(this.props.errors);
    };

    onChange = e => {
        if (this.showingError()) {
            this.props.loginClear();
        }

        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const loginData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(loginData);
    };

    componentDidMount () {
        if (this.showingError()) {
            this.props.loginClear();
        }
    }

    render () {
        const { from } = this.props.location.state || { from: { pathname: '/' } },
            { classes, errors, redirect } = this.props;

        let formHelper = errors.form ?
                <MessageBarContent
                    variant="error"
                    message={errors.form}
                    className={classes.formError}
                /> : null,
            emailHelper = errors.email ? <FormHelperText error>{errors.email}</FormHelperText> : null,
            passHelper = errors.password ? <FormHelperText error>{errors.password}</FormHelperText> : null;

        if (redirect) {
            return <Redirect to={from} />;
        }

        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <form noValidate onSubmit={this.onSubmit} className={classes.form}>
                        <FormControl margin="normal" required fullWidth error={!!emailHelper}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.onChange} />
                            { emailHelper }
                        </FormControl>
                        <FormControl margin="normal" required fullWidth error={!!passHelper}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.onChange} />
                            { passHelper }
                        </FormControl>
                        { formHelper }
                        <Button type="submit" variant="contained" fullWidth className={classes.submit}>Login</Button>
                        <Typography>
                            Don't have an account?
                            <Link component={RegisterLink} className={classes.link}>Register</Link>
                        </Typography>
                    </form>
                </Paper>
            </main>
        );
    }
}

const mapStateToProps = state => {
    let errors = _.get(state, 'login.errors', {}),
        redirect = _.get(state, 'login.auth', false);

    return {
        errors,
        redirect
    };
};

const mapDispatchToProps = {
    login,
    loginClear
};

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
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `0px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`
    },
    form: {
        width: '100%'
    },
    formError: {
        marginTop: theme.spacing.unit * 2
    },
    submit: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 2
    },
    link: {
        margin: theme.spacing.unit
    }
});

const connected = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default withStyles(styles)(connected);
