import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import Collection from './Collection';
import Home from './Home';
import Lists from './Lists';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';

const Main = ({ history }) => {
    return (
        <div>
            <div>
                Legion Builder
            </div>
            <hr/>
            <ConnectedRouter history={history}>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/lists" component={Lists} />
                <PrivateRoute path="/collection" component={Collection} />
            </ConnectedRouter>
        </div>
    );
};

export default Main;
