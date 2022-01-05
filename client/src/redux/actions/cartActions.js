import axios from 'axios'
import { ADD_TO_CART, DEL_FROM_CART, USER_CART, EMPTY_CART } from '../constants/cartConstants'
import { SHOW_MSG_ERROR, SHOW_MSG_SUCCESS } from '../constants/messageConstants'
export const addToCart = (product) => async dispatch => {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    const inCart = cart.some(item => item._id === product._id)

    if (!inCart) {
        cart = [...cart, { ...product, count: 1 }]
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: ADD_TO_CART,
            payload: cart
        })
    }
}

export const delFromCart = (product) => async dispatch => {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    const updatedCart = cart.filter(item => item._id !== product._id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    dispatch({
        type: DEL_FROM_CART,
        payload: updatedCart
    })

}

export const emptyCart = () => async dispatch => {

    dispatch({ type: EMPTY_CART })
}

export const saveCart = (cart) => async dispatch => {
    try {

        const result = await axios.post('/api/carts', cart)
        console.log(result.data)
        dispatch({
            type: SHOW_MSG_SUCCESS,
            payload: result.data.customMsgSuccess
        })
    } catch (error) {
        dispatch({
            type: SHOW_MSG_ERROR,
            payload: error.response.data.customMsgError
        })
    }


}

export const userCart = (id) => async dispatch => {
    const result = await axios.get(`/api/carts/${id}`)
    dispatch({
        type: USER_CART,
        payload: result.data
    })
    console.log(result.data)
}