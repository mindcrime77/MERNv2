import React from 'react'
import './Card.css'
import { deleteProduct, getProduct } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({ product, adminPage = false, homePage = false }) => {
    const dispatch = useDispatch()

    return (
        <div className="card">
            <img src={`/uploads/${product.fileName}`} alt="pictures" style={{ width: '100%' }} />
            <div className='card_data'>
                <h1>{product.productName}</h1>
                <p className="price">{product.productPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}</p>
                <p>{product.productQty <= 0 ? 'Out of stock' : 'In stock'}</p>
                <p >{product.productDescription.length > 60 ? product.productDescription.substring(0, 20) + '...' : product.productDescription} </p>
                {adminPage && <p className='buttons'>

                    <Link to={`/admin/edit/product/${product._id}`} className='link' onClick={() => dispatch(getProduct(product._id))}>
                        <i className="material-icons" style={{ fontSize: '24px' }}>mode_edit</i>
                        Edit</Link>
                    <button style={{ background: 'red' }} onClick={() => dispatch(deleteProduct(product._id))}>
                        <i className="material-icons" style={{ fontSize: '24px' }}>delete_forever</i>
                        DEL</button>
                </p>}
            </div>
            {homePage && <p className='buttons'>

                <Link to={`/product/${product._id}`} className='link' style={{ backgroundColor: 'cornflowerblue' }}>

                    View Product</Link>
                <button disabled={product.productQty <= 0} style={{ backgroundColor: product.productQty <= 0 && 'red' }} onClick={() => dispatch(addToCart(product))} >

                    Add to Cart</button>
            </p>}
        </div>
    )
}

export default Card

