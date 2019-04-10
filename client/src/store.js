import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import collection from './reducers/collectionReducer';
import login from './reducers/loginReducer';
import products from './reducers/productReducer';
import register from './reducers/registerReducer';

export const history = createBrowserHistory();

const reducers = combineReducers({
    router : connectRouter(history),
    collection,
    login,
    products,
    register
});

const enhancers = compose(applyMiddleware(routerMiddleware(history), thunk));

const state = {};

export default createStore(reducers, state, enhancers);
