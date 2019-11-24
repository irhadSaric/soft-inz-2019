import types from '../actionTypes';
import history from '../../utils/history';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function handleLoginActions(state = initialState, action) {
  switch (action.type) {
    case types.ACTIONS.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case types.ACTIONS.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case types.ACTIONS.LOGIN_FAILURE:
      return {};
    case types.ACTIONS.LOGOUT:
      return {};
    default:
      return state
  }
}

/*function handleLoginActions(state, action) {
  switch (action.type) {
    case types.ACTIONS.REQUEST_LOGIN:
      return {};
    case types.ACTIONS.RECEIVE_LOGIN:
    { const user = action.response.body;
      localStorage.setItem('username', action.params.username);
      localStorage.setItem('user', JSON.stringify(user));
      return user; }
    case types.ACTIONS.LOGOUT_USER:
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      history.push('/login');
      return {
        sessionToken: null,
      };
    default:
      return state;
  }
}*/

function loginReducer(state, action) {
  if (typeof state === 'undefined') {
    return {};
  }
  return Object.assign({}, state, handleLoginActions(state, action));
}

export default loginReducer;
