import { GET_PRODUCTS, CREATE_PRODUCT, DEL_PRODUCT, GET_PRODUCT } from '../constants/productConstants'

const INITIAL_STATE = {

    products: []
}

const productReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: payload
            }
        case "RESET":
            return {
                ...state,
                product: {}
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload]
            }
        case DEL_PRODUCT:
            return {
                ...state,
                products: state.products.filter(item => item._id !== payload._id)
            }


        default:
            return state
    }
}

export default productReducer