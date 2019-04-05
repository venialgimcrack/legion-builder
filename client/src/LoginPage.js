import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from './actions/login';

class LoginPage extends Component {

    render () {
        let { from } = this.props.location.state || { from: { pathname: '/' } },
            { redirect } = this.props;

        if (redirect) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <div>Login Form</div>
                <div>
                    <button onClick={this.props.login}>Log me in!</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        redirect: state.user.isAuthenticated
    };
};

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
