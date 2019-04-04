import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function isAuthenticated () {
    return false;
}

function checkAuthentication (Component, props) {
    if (isAuthenticated()) {
        return <Component {...props} />
    } else {
        return (
            <Redirect {...props}
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        );
    }
}

export default function PrivateRoute ({ component: Component, ...props }) {
    return <Route {...props} render={() => checkAuthentication(Component, props)} />;
};
