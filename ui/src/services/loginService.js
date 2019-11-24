import { authHeader } from '../utils/auth-header';
import config from 'config';

export const loginService = {
    login,
    logout,
    register,
    getAllCountries,
    getById,
    update,
    delete: _delete
};

let headers = new Headers();

  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //headers.append('Access-Control-Allow-Origin', '*');
  //headers.append('Access-Control-Allow-Credentials', 'true');

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.API_URL}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAllCountries() {
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    return fetch(`${config.API_URL}/api/codebooks/countries/all`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.API_URL}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.API_URL}/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.API_URL}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.API_URL}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}