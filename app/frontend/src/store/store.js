import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootreducer from '../reducers';
import logger from 'redux-logger';

const initialstate = {};

const middleware = [ thunk, logger ];

const store = createStore(rootreducer, initialstate, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
