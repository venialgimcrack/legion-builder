import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import CssBaseline from '@material-ui/core/CssBaseline';

import Collection from './Collection';
import Header from './Header';
import Home from './Home';
import Lists from './Lists';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Register from './Register';

import store from './store';
import { loginFinish, logout } from './actions/loginActions';
import setAuthToken from './utils/setAuthToken';
import { JWT_TOKEN_KEY } from './utils/constants';

if (!!localStorage[JWT_TOKEN_KEY]) {
    const token = localStorage[JWT_TOKEN_KEY],
        decoded = jwt_decode(token),
        currentTimeInSeconds = Date.now() / 1000;

    setAuthToken(token);

    store.dispatch(loginFinish(decoded));

    if (decoded.exp < currentTimeInSeconds) {
        store.dispatch(logout());
    }
}

const Main = ({ history }) => (
    <React.Fragment>
        <CssBaseline />
        <Header />
        <ConnectedRouter history={history}>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/lists" component={Lists} />
            <PrivateRoute path="/collection" component={Collection} />
        </ConnectedRouter>
    </React.Fragment>
);

export default Main;
