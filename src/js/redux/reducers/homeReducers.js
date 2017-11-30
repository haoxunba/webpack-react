import initialState from '../initialState';
import {TEST} from '../actionTypes';
import {combineReducers} from 'redux';

function testContent(state=initialState.test, action){
    switch(action.type) {
        case TEST:
            return action.msg
        default: 
            return state;
    }
}

const homeReducers = combineReducers({
    testContent
});

export default homeReducers;