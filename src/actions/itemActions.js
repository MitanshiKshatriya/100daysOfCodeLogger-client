import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from './types'
import axios from 'axios'

export const getItems = () => dispatch => {
    // return {
    //     type: GET_ITEMS
    //     // payload: {}
    // }
    dispatch(setItemsLoading());
    axios
    .get('/api/logs')
    .then(res => 
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    )
    .catch(err=>
       console.log(err) 
    )
}

export const addItem = (item) => dispatch => {
    // return {
    //     type: ADD_ITEM,
    //     payload: item
    // }
    axios
    .post('/api/logs', item)
    .then(res=> 
        dispatch({
            type:ADD_ITEM,
            payload: res.data
        })
    )
    .catch(err=>
        console.log(err) 
     )
}

export const deleteItem = (id)  => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}
