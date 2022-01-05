import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants'
import { SHOW_MSG_ERROR, SHOW_MSG_SUCCESS } from '../constants/messageConstants'
import { GET_PRODUCTS, CREATE_PRODUCT, DEL_PRODUCT, GET_PRODUCT } from '../constants/productConstants'
import axios from 'axios'
export const createProduct = (formData) => async dispatch => {

    try {
        dispatch({ type: START_LOADING })
        const response = await axios.post('/api/product', formData)
        dispatch({ type: STOP_LOADING })

        dispatch({ type: SHOW_MSG_SUCCESS, payload: response.data.customMsgSuccess })
        dispatch({
            type: CREATE_PRODUCT,
            payload: response.data.product
        })

    } catch (error) {
        console.log('Create API product error: ', error)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: SHOW_MSG_ERROR,
            payload: error.response.data.customMsgError
        })
    }
}

export const readAllProducts = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await axios.get('/api/product')
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.products
        })
    } catch (error) {
        console.log('Read all API product error: ', error)

    }
}

export const readAllProductsByCount = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await axios.get('/api/product/count')
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.products
        })
    } catch (error) {
        console.log('Read all API product error: ', error)

    }
}

export const deleteProduct = (id) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await axios.delete(`/api/product/${id}`)
        console.log(response.data)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: DEL_PRODUCT,
            payload: response.data.deletedProduct
        })
    } catch (error) {
        console.log('Delete API product error: ', error)
    }
}

export const getProduct = (id) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await axios.get(`/api/product/${id}`)
        console.log(response.data)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: GET_PRODUCT,
            payload: response.data.product
        })
    } catch (error) {
        console.log('Get single API product error: ', error)
    }
}

export const resetProduct = () => dispatch => {

    dispatch({
        type: 'RESET'

    })
}
