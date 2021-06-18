import uuid from 'react-uuid'
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM} from '../actions/types'


const initialState = {
    items:[
        {id:uuid(),desc:"Helo"},
        {id:uuid(),desc:"Helo"},
        {id:uuid(),desc:"Helo"},
        {id:uuid(),desc:"Helo"},
    ]
}
// action is an object {type: "",payload:""}
export default function(state = initialState, action) {
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state
            }
        default: 
        return state;
    }
}