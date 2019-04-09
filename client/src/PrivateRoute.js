import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const checkAuthentication = (Component, props) => {
    if (props.isLoggedIn) {
        return <Component {...props} />;
    } else {
        return (
            <Redirect {...props}
                to={{
                    pathname: '/login',
                    state: { from: props.path }
                }}
            />
        );
    }
};

const PrivateRoute = ({ component: Component, ...props }) => {
    return <Route {...props} render={() => checkAuthentication(Component, props)} />;
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.login.auth
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
