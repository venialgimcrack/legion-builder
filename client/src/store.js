import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import user from './reducers/user';

export const history = createBrowserHistory();

const reducers = combineReducers({
    router : connectRouter(history),
    user
});

const enhancers = compose(applyMiddleware(routerMiddleware(history), thunk));

const state = {};

export default createStore(reducers, state, enhancers);
