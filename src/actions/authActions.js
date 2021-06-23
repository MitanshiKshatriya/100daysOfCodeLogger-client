import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  UPDATE_DAYS_COMPLETED_ADD,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
//   CLEAR_ERRORS
} from './types';

//Check token & load user
export const loadUser = () => (dispatch, getState) => {

    // changes user loading from false to true
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user',tokenConfig(getState))
    .then(res=> dispatch({
        type: USER_LOADED,
        payload: res.data //user obj + token
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status))
    
        dispatch({
            type: AUTH_ERROR

        })
    })


}

// Register User
export const register = ({name,email,password}) => dispatch =>{
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //request body
    const body = JSON.stringify({name,email,password})

    axios.post('/api/users',body,config)
    .then(res=>{
dispatch({
    type:REGISTER_SUCCESS,
    payload:res.data
})
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
            type:REGISTER_FAIL
        })
    })
}

//Login user
export const login = ({name,email,password}) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //request body
    const body = JSON.stringify({email,password})

    axios.post('/api/auth',body,config)
    .then(res=>{
dispatch({
    type:LOGIN_SUCCESS,
    payload:res.data
})
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        dispatch({
            type:LOGIN_FAIL
        })
    })
}

// Logout user
export const logout = () => {
    //no functions on server side
    // dont need dispatch
    return {
        type: LOGOUT_SUCCESS
    }
}

// setup config . headers and token
export const tokenConfig = getState => {
    const token = getState().auth.token

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token add to headers in get request
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config
}

// update days_completed_add - NOT USING CURRENTLY
export const days_add = () => (dispatch,getState) => {
    let user = getState().user
    user.days_completed = user.days_completed+1
    dispatch({
        type:UPDATE_DAYS_COMPLETED_ADD,
        payload:user
    })
}