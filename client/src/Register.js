import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import _ from 'lodash';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { register } from './actions/registerActions';
import MessageBarContent from './MessageBarContent';

const LoginLink = props => <RouterLink to="/login" {...props} />;

class Register extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password1: '',
            password2: ''
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const registerData = {
            name: this.state.name,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        };

        this.props.register(registerData, this.props.history);
    };

    render () {
        const { classes, errors, redirect } = this.props;

        if (redirect) {
            return <Redirect to="/" />
        }

        let formHelper = errors.form ?
                <MessageBarContent
                    variant="error"
                    message={errors.form}
                    className={classes.formError}
                /> : null,
            nameHelper = errors.name ? <FormHelperText error>{errors.name}</FormHelperText> : null,
            emailHelper = errors.email ? <FormHelperText error>{errors.email}</FormHelperText> : null,
            pass1Helper = errors.password1 ? <FormHelperText error>{errors.password1}</FormHelperText> : null,
            pass2Helper = errors.password2 ? <FormHelperText error>{errors.password2}</FormHelperText> : null;

        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <form noValidate onSubmit={this.onSubmit} className={classes.form}>
                        <FormControl margin="normal" required fullWidth error={!!nameHelper}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" name="name" autoComplete="name" autoFocus onChange={this.onChange} />
                            { nameHelper }
                        </FormControl>
                        <FormControl margin="normal" required fullWidth error={!!emailHelper}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" name="email" autoComplete="email" onChange={this.onChange} />
                            { emailHelper }
                        </FormControl>
                        <FormControl margin="normal" required fullWidth error={!!pass1Helper}>
                            <InputLabel htmlFor="password1">Password</InputLabel>
                            <Input name="password1" type="password" id="password1" autoComplete="current-password" onChange={this.onChange} />
                            { pass1Helper }
                        </FormControl>
                        <FormControl margin="normal" required fullWidth error={!!pass2Helper}>
                            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                            <Input name="password2" type="password" id="password2" autoComplete="current-password" onChange={this.onChange} />
                            { pass2Helper }
                        </FormControl>
                        { formHelper }
                        <Button type="submit" variant="contained" fullWidth className={classes.submit}>Register</Button>
                        <Typography>
                            Already have an account?
                            <Link component={LoginLink} className={classes.link}>Login</Link>
                        </Typography>
                    </form>
                </Paper>
            </main>
        );
    }
};

const mapStateToProps = state => {
    let errors = _.get(state, 'register.errors', {}),
        redirect = _.get(state, 'login.auth', false);

    return {
        errors,
        redirect
    };
};

const mapDispatchToProps = {
    register
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

const connected = connect(mapStateToProps, mapDispatchToProps)(Register);
export default withStyles(styles)(connected);
