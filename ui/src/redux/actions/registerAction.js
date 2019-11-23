import { postDispatch } from './fetchUtils';
import types from '../actionTypes';

const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).sessionToken : '';
const serviceId = 'register';
const resource = 'REGISTER';
const action = 'GET_REGISTRATION';

function register(
  firstname, lastname, email, password,
) {
  return (dispatch) => {
    const requestDataInitial = {
      firstname,
      lastname,
      email,
      password
    };
    const requestData = JSON.parse(JSON.stringify(requestDataInitial));
    const params = { serviceId, resource, action, requestData };
    const opts = {
      types:
        {
            request: types.ACTIONS.REQUEST_REGISTRATION,
            response: types.ACTIONS.RECEIVE_REGISTRATION,
        },
      params,
      token,
    };
    return dispatch(postDispatch(opts));
  };
}
export default {
  register,
};

