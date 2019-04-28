import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import collection from './reducers/collectionReducer';
import content from './reducers/contentReducer';
import login from './reducers/loginReducer';
import products from './reducers/productReducer';
import register from './reducers/registerReducer';
import snackbar from './reducers/snackbarReducer';

export const history = createBrowserHistory();

const reducers = combineReducers({
    router : connectRouter(history),
    collection,
    content,
    login,
    products,
    register,
    snackbar
});

const enhancers = compose(applyMiddleware(routerMiddleware(history), thunk));

const state = {};

export default createStore(reducers, state, enhancers);
