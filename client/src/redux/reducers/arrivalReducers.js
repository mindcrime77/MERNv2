import { NEW_ARRIVALS } from '../constants/newArrivals'
const iintialState = {
    newArrivals: []
}

export const newArrivals = (state = iintialState, { type, payload }) => {
    switch (type) {
        case NEW_ARRIVALS:
            return {
                newArrivals: [...payload]
            }
        default:
            return state
    }
}