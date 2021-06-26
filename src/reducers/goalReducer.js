import {
    GOALS_LOADING,
    GET_GOALS,
    // POST_GOALS,
    // CLEAR_ERRORS,
    // GET_ERRORS
  } from '../actions/types';

const initialState = {
    goals: [],
    isLoading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GOALS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case GET_GOALS:
            return {
                ...state,
                goals: action.payload, //goals
                isLoading:false
            }
        default: 
        return state
    }
}