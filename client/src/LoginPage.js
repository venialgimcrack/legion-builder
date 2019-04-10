import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

import { login } from './actions/loginActions';

class LoginPage extends Component {
    constructor(props) {
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
                    <div>Don't have an account? <Link to="/register">Register</Link></div>
                </form>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
