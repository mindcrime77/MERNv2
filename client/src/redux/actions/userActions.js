import axios from 'axios'
import { GET_USERS } from '../constants/userConstants'
export const getAllUsers = () => async dispatch => {
    try {
        const users = await axios.get('/api/users')
        dispatch({
            type: GET_USERS,
            payload: users.data
        })
        console.log(users)
    } catch (error) {

    }
}

export const changeRole = (id, role) => dispatch => {
    const result = axios.post(`/api/users/${id}`, role)
    //console.log(result.data)
}