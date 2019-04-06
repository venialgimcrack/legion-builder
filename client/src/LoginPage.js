import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from './actions/login';

class LoginPage extends Component {

    constructor() {
        super();

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
            { errors, redirect } = this.props;

        if (redirect) {
            return <Redirect to={from} />;
        }

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
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors,
        redirect: state.user.isAuthenticated
    };
};

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
