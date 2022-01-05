import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import './AdminBody.css'
const AdminBody = () => {
    const { products } = useSelector(state => state.products)
    return (
        <div className='admin'>

            {products && products.map(product => <Card product={product} key={product._id} adminPage={true} />)}

        </div>
    )
}

export default AdminBody
