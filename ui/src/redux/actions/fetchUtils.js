import request from 'superagent';
import types from '../actionTypes';

const PROXY_ROUTE = '';

function requestOptions(params, type) {
  return {
    type,
    params,
  };
}

function receiveOptions(response, params, type) {
  return {
    type,
    response,
    params,
  };
}


function logoutUser() {
  return {
    type: types.ACTIONS.LOGOUT_USER,
  };
}

function postDispatch(opts) {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).sessionToken : '';
  return (dispatch) => {
    dispatch(requestOptions(opts.params, opts.types.request));
    return request
      .post(PROXY_ROUTE)
      .send(opts.params)
      .set('Accept', 'application/json')
      .set('xauthtoken', token)
      .then(
        response => (response.status === 440 ? dispatch(logoutUser()) : dispatch(receiveOptions(response, opts.params, opts.types.response))),
      )
      .catch(err => (err.response.status === 440 ? dispatch(logoutUser()) : ''));
  };
}

function fetchDispatch(opts) {
  return (dispatch) => {
    dispatch(requestOptions(opts.params, types));
    return request
      .post(PROXY_ROUTE)
      .send(opts.params)
      .set('Accept', 'application/json')
      .set('xauthtoken', opts.token)
      .then(
        response => (response.status === 440 ? dispatch(logoutUser()) : dispatch(receiveOptions(response, opts.params, opts.responseType))),
      )
      .catch(err => (err.response.status === 440 ? dispatch(logoutUser()) : ''));
  };
}

export { postDispatch, fetchDispatch };
