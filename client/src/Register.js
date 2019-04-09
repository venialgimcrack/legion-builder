import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

import { register } from './actions/registerActions';

class Register extends Component {
    constructor() {
        super();

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

    render() {
        const { errors, redirect } = this.props;

        if (redirect) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <div>Register Form</div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={this.state.name} onChange={this.onChange} />
                        <span>{errors.name || ''}</span>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={this.state.email} onChange={this.onChange} />
                        <span>{errors.email || ''}</span>
                    </div>
                    <div>
                        <label htmlFor="password1">Password</label>
                        <input id="password1" type="password" value={this.state.password1} onChange={this.onChange} />
                        <span>{errors.password1 || ''}</span>
                    </div>
                    <div>
                        <label htmlFor="password2">Confirm Password</label>
                        <input id="password2" type="password" value={this.state.password2} onChange={this.onChange} />
                        <span>{errors.password2 || ''}</span>
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                    <div>Already have an account? <Link to="/login">Login</Link></div>
                </form>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
