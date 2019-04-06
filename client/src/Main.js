import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import Collection from './Collection';
import Header from './Header';
import Home from './Home';
import Lists from './Lists';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Register from './Register';

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
