import { combineReducers } from "redux";
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import goalReducer from "./goalReducer";

export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    goal: goalReducer,
    error: errorReducer
});