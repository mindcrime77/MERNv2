import { SHOW_MSG_SUCCESS, SHOW_MSG_ERROR, CLEAR_MESSAGES } from '../constants/messageConstants'

const INITIAL_STATE = {
    msgSuccess: '',
    msgError: ''
}

const messageReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SHOW_MSG_SUCCESS:
            return {
                ...state,
                msgSuccess: payload
            }
        case SHOW_MSG_ERROR:
            return {
                ...state,
                msgError: payload
            }
        case CLEAR_MESSAGES:
            return {
                msgSuccess: '',
                msgError: ''
            }
        default:
            return state
    }
}

export default messageReducer