import * as AT from "./authTypes";
import AuthService from "../../../services/authService"

const loginRequest = () => {
    return {
        type: AT.LOGIN_REQUEST
    }
}

const loginSuccess = (data) => {
    return {
        type: AT.LOGIN_SUCCESS,
        payload: {user: data}
    }
}

const loginFailure = () => {
    return {
        type: AT.LOGIN_FAILURE
    }
}

const registerSuccess = () => {
    return {
        type: AT.REGISTER_SUCCESS
    }
}

const registerFailure = () => {
    return {
        type: AT.REGISTER_FAILURE
    }
}


const setMessage = (message) => {
    return {
        type: AT.SET_MESSAGE,
        payload: message
    }
}

const logoutDispatcher = () => {
    return {
        type: AT.LOGOUT
    }
}

const refreshToken = (accessToken) => {
    return {
        type: AT.REFRESH_REQUEST,
        payload: accessToken
    }
}

export const refresh = (accessToken) => (dispatch) => {
    return refreshToken(accessToken)
}

export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch(registerSuccess());
            dispatch(setMessage(response.data.message));
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(registerFailure());
            dispatch(setMessage(message));
            return Promise.reject();
        }
    );
};


export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch(loginSuccess(data));
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch(loginFailure());
            dispatch(setMessage(message));
            return Promise.reject();
        }
    )
}



export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch(logoutDispatcher());
};




