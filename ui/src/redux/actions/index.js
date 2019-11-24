import types from '../actionTypes';
import loginAction from './loginAction';
import registerAction from './registerAction';
import countryAction from './countryAction';

function resetErrorMessage() {
  return { type: types.ACTIONS.RESET_ERROR_MESSAGE };
}

export {
  loginAction,
  registerAction,
  countryAction,
  resetErrorMessage,
};
