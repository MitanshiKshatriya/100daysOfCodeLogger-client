import {
    GOALS_LOADING,
    GET_GOALS,
    POST_GOALS,
    // CLEAR_ERRORS,
    // GET_ERRORS
  } from './types';

import axios from 'axios'
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

export const loadGoals = () => (dispatch,getState) => {

    dispatch({type:GOALS_LOADING})
    axios.get('/api/goals/',tokenConfig(getState))
    .then(res=> dispatch({
        type: GET_GOALS,
        payload: res.data
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status))
    })


}

export const postGoals = (goals) => (dispatch,getState) => {
// console.log(JSON.stringify(goals))
const body = JSON.stringify(goals)
axios.post('/api/goals',body,tokenConfig(getState))
.then(res=>
    dispatch({
        type:POST_GOALS,
        payload: res.data
    })
    )
.catch(err=>{
    console.log(err)
    dispatch(returnErrors(err.msg, err.status))
})
}