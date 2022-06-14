import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducer/index'
import thunk from 'redux-thunk'

let store = createStore (
    reducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store