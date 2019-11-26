import types from '../actionTypes';

function country(state, action) {
  switch (action.type) {
    case types.GETALL_REQUEST:
      return {
        loading: true,
      };
    case types.GETALL_RESPONSE:
      return {
        countries: action.countries
      };
    default:
      return state
  }
}

function countryReducer(state, action) {
  if (typeof state === 'undefined') {
    return {};
  }
  return Object.assign({}, state, country(state, action));
}
export default countryReducer;
