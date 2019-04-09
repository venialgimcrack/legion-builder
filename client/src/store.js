import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import errors from './reducers/errors';
import user from './reducers/user';
import products from './reducers/productReducer';

export const history = createBrowserHistory();

const reducers = combineReducers({
    router : connectRouter(history),
    errors,
    user,
    products
});

const enhancers = compose(applyMiddleware(routerMiddleware(history), thunk));

const state = {};

export default createStore(reducers, state, enhancers);
