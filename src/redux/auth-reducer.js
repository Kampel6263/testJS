import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const LOGIN = 'LOGIN';


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
            case LOGIN:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id,email,login,isAuth) => ({type:SET_USER_DATA, payload: {id,email,login,isAuth} })

export const getAutnUserData = () => (dispatch) =>{
    return authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    });
}

export const login = (email, password, rememberMe) => (dispatch) =>{

    return authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAutnUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    });
}
export const logout = () => (dispatch) =>{
    return authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null,null, null, false));
        }
    });
}

export default authReducer;
