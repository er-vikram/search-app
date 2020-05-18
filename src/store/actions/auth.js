import axios from '../../axios-admin';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    sessionStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// Main
export const auth = (userName, password) => {
    return dispatch => {

        dispatch(authStart());

        const authData = {
            username: userName,
            credential: password
        };

        axios({
            method: 'post',
            url: 'http://3.122.7.162:5000/v60/admin/session',
            data: authData
        }).then(response => {
            const token = new Date().getTime() + 1111 * 1000
            sessionStorage.setItem('token', token);
            dispatch(authSuccess(token));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail("Please contact the System Administrator at extension 1001 to create a new Login or reset your password."));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = sessionStorage.getItem('token');
        if (token) {
            dispatch(authSuccess(token));    
        }
    };
};