import request from 'superagent';
import types from '../actionTypes';
import { toast } from 'react-toastify';
import { loginService } from '../../services/loginService';
import {alertAction} from './alertAction';
import history from '../../utils/history';

/* function requestLogin(params) {
  return {
    type: types.ACTIONS.REQUEST_LOGIN,
    params,
  };
}

function receiveLoginData(response, params) {
  return {
    type: types.ACTIONS.RECEIVE_LOGIN,
    response,
    params,
  };
}

function logoutUser() {
  return {
    type: types.ACTIONS.LOGOUT_USER,
  };
}

const logout = () => function dispatchFunction(dispatch) {
  return dispatch(logoutUser());
};

const login = params => function dispatchFunction(dispatch) {
  dispatch(requestLogin(params));
  return request
    .post(LOGIN_ROUTE)
    .send(params)
    .set('Accept', 'application/json')
    .then(
      response => (response && response.name === 'NOT-AUTHENTICATED'
        ? toast.warn('Wrong login details. Please try again!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        })
        : dispatch(receiveLoginData(response, params))),
    )
    .catch(
      err => toast.warn('Wrong login details. Please try again!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      }),
    );

}; */

function login(email, password) {
  return dispatch => {
      dispatch(request({ email }));

      loginService.login(email, password)
          .then(
              user => { 
                  dispatch(success(user));
                  history.push('/');
              },
              error => {
                  dispatch(failure(error.toString()));
                  dispatch(alertAction.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: types.ACTIONS.LOGIN_REQUEST, user } }
  function success(user) { return { type: types.ACTIONS.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: types.ACTIONS.LOGIN_FAILURE, error } }
}

function logout() {
  loginService.logout();
  return { type: types.ACTIONS.LOGOUT };
}

function register(user) {
  return dispatch => {
      dispatch(request(user));

      loginService.register(user)
          .then(
              user => { 
                  dispatch(success());
                  history.push('/login');
                  dispatch(alertAction.success('Registration successful'));
              },
              error => {
                  dispatch(failure(error.toString()));
                  dispatch(alertAction.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: types.ACTIONS.REGISTER_REQUEST, user } }
  function success(user) { return { type: types.ACTIONS.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: types.ACTIONS.REGISTER_FAILURE, error } }
}
export default { login, logout, register };
