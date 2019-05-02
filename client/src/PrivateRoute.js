import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...other }) => (
    <Route { ...other } render={props => {
        if (other.isLoggedIn) {
            return <Component { ...props } />
        } else {
            return <Redirect {...props}
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />;
        }
    }} />
);

const mapStateToProps = state => ({
    isLoggedIn: state.login.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
