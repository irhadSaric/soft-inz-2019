import types from '../actionTypes';

export function alert(state = {}, action) {
  switch (action.type) {
    case types.ACTIONS.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case types.ACTIONS.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case types.ACTIONS.CLEAR:
      return {};
    default:
      return state
  }
}