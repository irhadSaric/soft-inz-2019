import { combineReducers } from 'redux';
// import CONSTS from '../actionTypes';
import user from './loginReducer';
import {registration} from './registerReducer';
import {alert} from './alertReducer';
import {country} from './countryReducer';

const rootReducer = combineReducers({
    user,
    registration,
    alert,
    country,
});

export default rootReducer;
