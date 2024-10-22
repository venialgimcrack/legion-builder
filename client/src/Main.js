import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Collection from './Collection';
import HeaderBar from './HeaderBar';
import Home from './Home';
import ListEditor from './ListEditor';
import ListViewer from './ListViewer';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import SnackbarProvider from './SnackbarProvider';

import store from './store';
import { loginFinish, logout } from './actions/loginActions';
import setAuthToken from './utils/setAuthToken';
import { JWT_TOKEN_KEY } from './utils/constants';

if (!!localStorage[JWT_TOKEN_KEY]) {
    try {
        const token = localStorage[JWT_TOKEN_KEY],
            decoded = jwt_decode(token),
            currentTimeInSeconds = Date.now() / 1000;

        setAuthToken(token);

        store.dispatch(loginFinish(decoded));

        if (decoded.exp < currentTimeInSeconds) {
            store.dispatch(logout());
        }

    } catch (ex) {
        console.error(ex);
        store.dispatch(logout());
    }
}

// TODO make a legit 404 page
const NotFound = () => (
    <Typography>Four. Oh, four.</Typography>
);

const Main = () => (
    <React.Fragment>
        <CssBaseline />
        <Router>
            <HeaderBar />
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/lists" exact component={ListViewer} />
            <PrivateRoute path="/lists/:id" component={ListEditor} />
            <PrivateRoute path="/collection" component={Collection} />
            <Route component={NotFound} />
            </Switch>
        </Router>
        <SnackbarProvider />
    </React.Fragment>
);

export default Main;
