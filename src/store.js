import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

// called index.js default import
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store