import types from '../actionTypes';

export const alertAction = {
    success,
    error,
    clear
};

function success(message) {
    return { type: types.ACTIONS.SUCCESS, message };
}

function error(message) {
    return { type: types.ACTIONS.ERROR, message };
}

function clear() {
    return { type: types.ACTIONS.CLEAR };
}