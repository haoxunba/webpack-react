import {createStore, compose, applyMiddleware} from 'redux';
import  reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger();

function configStoreDev(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        thunk,
        logger
    ]
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
    ))

    if(module.hot) {
        module.hot.accept('./reducers'), ()=>{
            const nextReducer = require('./reducers/index').default;
            store.replaceReducer(nextReducer);
        }
    }
    return store;
}

function configStoreProd(initialState) {
    const middlewares = [
        
        thunk,
        
    ]
    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares)
    ))

    
}

const configStore = process.env.NODE_ENV != 'development' ? configStoreProd : configStoreDev;

export default configStore;