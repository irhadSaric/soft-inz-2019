import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
function stringsToObject (actions) {
  return actions
    .trim()
    .split(/\s+/)
    .reduce((obj, action) => {
      obj[action] = action
      return obj
    }, {});
}

export default {
  API_URL: 'urlz',
  ACTIONS: stringsToObject(`
    REQUEST_LOGIN
    RECEIVE_LOGIN
    REQUEST_REGISTRATION
    RECEIVE_REGISTRATION
    LOGIN_REQUEST
    LOGIN_SUCCESS
    LOGIN_FAILURE
    REGISTER_REQUEST
    REGISTER_SUCCESS
    REGISTER_FAILURE
    GETALL_REQUEST
    GETALL_RESPONSE
    SUCCESS
    ERROR
    CLEAR
  `),
};
