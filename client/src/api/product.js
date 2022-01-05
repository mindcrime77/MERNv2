import axios from 'axios'

export const createProduct = async (product) => {

    const response = await axios.post('/api/product', product)
    return response
}

