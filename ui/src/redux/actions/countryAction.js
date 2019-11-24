import types from '../actionTypes';
import { loginService } from '../../services/loginService';

function getAllCountries() {
    return dispatch => {
        dispatch(request());

        loginService.getAllCountries()
            .then(
                countries => dispatch(response(countries)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: types.ACTIONS.GETALL_REQUEST } }
    function response(countries) { return { type: types.ACTIONS.GETALL_RESPONSE, countries } }
    function failure(error) { return { type: types.ACTIONS.GETALL_FAILURE, error } }
}
  
export default { getAllCountries };
