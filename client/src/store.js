import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import collection from './reducers/collectionReducer';
import content from './reducers/contentReducer';
import list from './reducers/listReducer';
import login from './reducers/loginReducer';
import products from './reducers/productReducer';
import register from './reducers/registerReducer';
import snackbar from './reducers/snackbarReducer';

const reducers = combineReducers({
    collection,
    content,
    list,
    login,
    products,
    register,
    snackbar
});

const enhancers = compose(applyMiddleware(thunk));

const state = {};

export default createStore(reducers, state, enhancers);
