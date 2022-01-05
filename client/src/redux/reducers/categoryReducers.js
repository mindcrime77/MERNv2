import { GET_CATEGORIES, CREATE_CATEGORY } from '../constants/categorieConstants'

const INITIAL_STATE = {
    categories: []
}

const categoryReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, payload]
            }
        default:
            return state
    }
}

export default categoryReducer