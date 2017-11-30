import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import homeReducers from './homeReducers';

const rootReducer = combineReducers({
    routing: routerReducer,
    homeReducers
});

export default rootReducer;