import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Collection from './Collection';
import Home from './Home';
import Lists from './Lists';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

export default class Main extends Component {
    render () {
        return (
            <Router>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/lists" component={Lists} />
                <PrivateRoute path="/collection" component={Collection} />
            </Router>
        );
    }
};
