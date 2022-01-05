import axios from 'axios'

export const createCategory = async (category) => {
    const response = await axios.post('/api/category', category)
    return response
}

export const loadCategories = async () => {
    const response = await axios.get('/api/category')
    return response
}