import types from '../actionTypes';

export function country(state = {}, action) {
  switch (action.type) {
    case types.GETALL_REQUEST:
      return {
        loading: true,
      };
    case types.GETALL_RESPONSE:
      return {
        items: action.countries
      };
    default:
      return state
  }
}