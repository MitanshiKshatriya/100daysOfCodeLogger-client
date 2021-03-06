// import uuid from 'react-uuid'
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING, UPDATE_ITEM} from '../actions/types'


// const initialState = {
//     items:[
//         {id:uuid(),desc:"Helo"},
//         {id:uuid(),desc:"Helo"},
//         {id:uuid(),desc:"Helo"},
//         {id:uuid(),desc:"Helo"},
//     ]
// }
const initialState = {
    items:[],
    loading: false
}
// action is an object {type: "",payload:""}
export default function(state = initialState, action) {
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading:false
            }
            case DELETE_ITEM:
                return {
                    ...state,
                    items: state.items.filter(item=> item._id!==action.payload)
                }
            case ADD_ITEM:
                return {
                    ...state,
                    items: [action.payload,...state.items]
                }
            case UPDATE_ITEM:
                return {
                    ...state,
                    items: [...state.items,action.payload]
                }
            case ITEMS_LOADING:
                return {
                    ...state,
                    loading: true
                }
        default: 
        return state;
    }
}