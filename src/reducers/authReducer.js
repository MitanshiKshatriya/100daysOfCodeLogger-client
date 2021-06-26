import {
    USER_LOADED,
    USER_LOADING,
    UPDATE_DAYS_COMPLETED_ADD,
    UPDATE_DAYS_COMPLETED_DELETE,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../actions/types';
const initalState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function(state=initalState, action) {
    switch(action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
          // console.log(action.payload)
            return {
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload //only user
            }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload, //token+user
        isAuthenticated: true,
        isLoading: false
      };
      case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
          localStorage.removeItem('token');
          return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false
          };

    case UPDATE_DAYS_COMPLETED_ADD:
      return {
        ...state,
        user:action.payload //updated user
      }

    case UPDATE_DAYS_COMPLETED_DELETE:
        return {
          ...state,
          
        }

    
        default:
            return state
    }
}