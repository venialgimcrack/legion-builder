import React, { Component } from 'react';
import { connect } from 'react-redux';
import { /*Link,*/ Redirect } from 'react-router-dom';
import _ from 'lodash';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

import { login } from './actions/loginActions';

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
    submit: {
        marginTop: theme.spacing.unit * 4
    }
});

class LoginPage extends Component {
    constructor (props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    onChange = e => {
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

    render () {
        const { from } = this.props.location.state || { from: { pathname: '/' } },
            { classes, errors, redirect } = this.props;

        console.log(errors);

        if (redirect) {
            return <Redirect to={from} />;
        }
/*
        return (
            <div>
                <div>Login Form</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={this.state.email} onChange={this.onChange} />
                        <span>{errors.email || ''}</span>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={this.state.password} onChange={this.onChange} />
                        <span>{errors.password || ''}</span>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <div>Don't have an account? <Link to="/register">Register</Link></div>
                </form>
            </div>
        );
*/
        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <form onSubmit={this.onSubmit} className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.onChange} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.onChange} />
                        </FormControl>
                        <Button type="submit" variant="contained" fullWidth className={classes.submit}>Login</Button>
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
    login
};

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const connected = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default withStyles(styles)(connected);
