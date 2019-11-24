import types from '../actionTypes';
import loginAction from './loginAction';
import registerAction from './registerAction';

function resetErrorMessage() {
  return { type: types.ACTIONS.RESET_ERROR_MESSAGE };
}

export {
  loginAction,
  registerAction,
  resetErrorMessage,
};
