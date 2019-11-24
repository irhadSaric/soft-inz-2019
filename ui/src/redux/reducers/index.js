import { combineReducers } from 'redux';
// import CONSTS from '../actionTypes';
import user from './loginReducer';
import {registration} from './registerReducer';
import {alert} from './alertReducer';

const rootReducer = combineReducers({
    user,
    registration,
    alert,
});

export default rootReducer;
