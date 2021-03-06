import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,UPDATE_ITEM,ITEMS_LOADING} from './types'
import {tokenConfig} from './authActions'
import { returnErrors } from './errorActions'
import axios from 'axios'

export const getItems = () => (dispatch,getState) => {
    // return {
    //     type: GET_ITEMS
    //     // payload: {}
    // }
    dispatch(setItemsLoading());
    // const userId = getState().auth.user._id

    axios
    .get(`/api/logs/`,tokenConfig(getState))
    .then(res => 
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    )
    .catch(err=>
       dispatch(returnErrors(err.response.data,err.response.status))
    )
}

export const addItem = (item) => (dispatch,getState) => {
    // return {
    //     type: ADD_ITEM,
    //     payload: item
    // }
    // item.userId = getState().auth.user._id
    axios
    .post('/api/logs', item, tokenConfig(getState))
    .then(res=> {
        dispatch({
            type:ADD_ITEM,
            payload: res.data
        })
    }
    )
    .catch(err=>
        console.log(err) 
     )
}

export const deleteItem = (id)  => (dispatch,getState) => {
    // return {
    //     type: DELETE_ITEM,
    //     payload: id
    // }
    axios.delete(`/api/logs/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
        )
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

export const updateItem = (item) => (dispatch,getState) => {
    // return {
    //     type: UPDATE_ITEM,
    //     payload: item
    // }
    axios
    .post('/api/logs/update', item, tokenConfig(getState))
    .then(res=> 
        dispatch({
            type:UPDATE_ITEM,
            payload: res.data
        })
    )
    .catch(err=>
        console.log(err) 
     )
}
