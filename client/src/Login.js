import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    state = {
        redirect: false
    };

    render () {
        let { from } = this.props.location.state || { from: { pathname: '/' } },
            { redirect } = this.state;

        if (redirect) {
            return <Redirect to={from} />;
        }

        return <div>Login Form</div>;
    }
};
