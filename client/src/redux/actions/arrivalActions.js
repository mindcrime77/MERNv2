import axios from 'axios'
import { NEW_ARRIVALS } from '../constants/newArrivals'
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants'
import { SHOW_MSG_ERROR } from '../constants/messageConstants'
import { GET_PRODUCTS } from '../constants/productConstants'
export const getNewArrivals = (sortBy = 'desc', limit = 3) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await axios.get(`/api/filter?sortBy=${sortBy}&limit=${limit}`)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: NEW_ARRIVALS,
            payload: response.data.arrivals
        })
    } catch (error) {
        console.log('Get API arrival error: ', error)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: SHOW_MSG_ERROR,
            payload: error.response.data.customMsgError
        })

    }
}

export const getProductsByFilter = (arg) => async dispatch => {
    try {

        const response = await axios.post('/api/filter/search', arg)

        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.products
        })
    } catch (error) {
        console.log('getProductsByFilter product api error: ', error)

    }
}
