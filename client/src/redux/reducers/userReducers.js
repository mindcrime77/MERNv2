import { GET_USERS } from '../constants/userConstants'
const initialState = {
    users: []
}

export const getAllUsers = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: [...payload]
            }
        default:
            return state
    }
}