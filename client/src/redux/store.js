import { combineReducers, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loadingReducer from './reducers/loadingReducers'
import messageReducer from './reducers/messageReducers'
import categoryReducer from './reducers/categoryReducers'
import productReducer from './reducers/productReducers'
import { newArrivals } from '../redux/reducers/arrivalReducers'
import { cartReducer, userCartReducer } from '../redux/reducers/cartReducers'

const reducer = combineReducers({
    loading: loadingReducer,
    messages: messageReducer,
    categories: categoryReducer,
    products: productReducer,
    filters: newArrivals,
    cart: cartReducer,
    usercart: userCartReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store