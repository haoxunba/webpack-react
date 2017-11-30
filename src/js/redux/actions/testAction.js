import {TEST} from '../actionTypes';

export function test(msg){
    return {
        type: TEST,
        msg
    }
}