import axios from 'axios'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    GET_ERRORS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS, REGISTER_FAIL
} from './types'

export const loadUser = () => (dispatch,getState) => {
    //user loading
    dispatch({type: USER_LOADING});

    const config = getTokenConfig(getState)

    axios.get('/api/auth/user',config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch({
                type : AUTH_ERROR
            })
        })
};


//login user
export const loginUser = (username,password) => (dispatch) => {

    const config = {
        headers : {
            'Content-type' : 'application/json'
        }
    };

    // body
    const  body = JSON.stringify({username,password})
    axios.post('/api/login/',body,config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err
            })
            dispatch({
                type : LOGIN_FAIL
            })
        })
};

export const logoutUser = () => (dispatch,getState) => {


    const config = getTokenConfig(getState)

    axios.post('/api/auth/logout/',null,config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch({
                type : AUTH_ERROR
            })
        })
};

//register user
export const registerUser = ({username,email,password}) => (dispatch,getState) => {

    const config = getTokenConfig(getState)

    // body
    const  body = JSON.stringify({username,email,password})
    axios.post('/api/auth/register',body,config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err
            })
            dispatch({
                type : REGISTER_FAIL
            })
        })
};

export const getTokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers : {
            'Content-type' : 'application/json'
        }
    };

    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}