import types from '../actionTypes';

export function registration(state = {}, action) {
  switch (action.type) {
    case types.ACTIONS.REGISTER_REQUEST:
      return { registering: true };
    case types.ACTIONS.REGISTER_SUCCESS:
      return {};
    case types.ACTIONS.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}