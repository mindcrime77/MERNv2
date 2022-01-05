import { GET_CATEGORIES, CREATE_CATEGORY } from '../constants/categorieConstants'
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants'
import { SHOW_MSG_ERROR, SHOW_MSG_SUCCESS } from '../constants/messageConstants'
import axios from 'axios'

export const categoryAction = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await axios.get('/api/category')
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data.categories
        })

    } catch (error) {
        console.log('Get API categories error: ', error)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: SHOW_MSG_ERROR,
            payload: error.response.data.customMsgError
        })

    }
}

export const createCategory = (category) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await axios.post('/api/category', category)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: SHOW_MSG_SUCCESS,
            payload: response.data.customMsgSuccess
        })
        dispatch({
            type: CREATE_CATEGORY,
            payload: response.data.category
        })

    } catch (error) {
        console.log('Create API category error: ', error)
        dispatch({ type: STOP_LOADING })
        dispatch({
            type: SHOW_MSG_ERROR,
            payload: error.response.data.customMsgError
        })
    }
}

