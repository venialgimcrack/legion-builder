import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Collection from './Collection';
import Header from './Header';
import Home from './Home';
import Lists from './Lists';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Register from './Register';

import store from './store';
import { loginSuccess, logout } from './actions/login';
import setAuthToken from './utils/setAuthToken';
import { JWT_TOKEN_KEY } from './utils/constants';

if (!!localStorage[JWT_TOKEN_KEY]) {
    const token = localStorage[JWT_TOKEN_KEY],
        decoded = jwt_decode(token),
        currentTimeInSeconds = Date.now() / 1000;

    setAuthToken(token);

    store.dispatch(loginSuccess(decoded));

    if (decoded.exp < currentTimeInSeconds) {
        store.dispatch(logout());
    }
}

const Main = ({ history }) => {
    return (
        <div>
            <Header />
            <ConnectedRouter history={history}>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/lists" component={Lists} />
                <PrivateRoute path="/collection" component={Collection} />
            </ConnectedRouter>
        </div>
    );
};

export default Main;
