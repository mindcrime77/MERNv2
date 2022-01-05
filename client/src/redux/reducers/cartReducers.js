import { ADD_TO_CART, DEL_FROM_CART, USER_CART, EMPTY_CART } from '../constants/cartConstants'
const initialState = {

    cart: []
}

if (localStorage.getItem('cart')) {
    initialState.cart = JSON.parse(localStorage.getItem('cart'))
} else {
    initialState.cart = []
}

//initialState.cart = JSON.parse(localStorage.getItem('cart')) ?? []

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:

            return {
                ...state,
                cart: [...payload]
            }
        case DEL_FROM_CART:

            return {
                ...state,
                cart: [...payload]
            }
        case EMPTY_CART:
            return {
                ...state,
                cart: []
            }

        default:
            return state
    }
}

export const userCartReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case USER_CART:

            return {
                ...state,
                usercart: [...payload]
            }
        default:
            return state
    }
}