import React, { useEffect } from 'react'
import { getProduct } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import './Product.css'

function Product() {
    const navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct(id))
        /*  return () => {
             dispatch(resetProduct())
         } */
    }, [dispatch, id])
    const { product } = useSelector(state => state.products)
    return (
        <div>
            <button onClick={() => navigate(-1)}>Go Back</button>

            {product && <div className='product'>
                <div className='product_image'>
                    <img src={`/uploads/${product.fileName}`} alt='product' />
                </div>
                <div className='product_data'>
                    <h3>{product.productName}</h3>
                    <p>Price: {product.productPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })}</p>
                    <p>Status: {product.productQty <= 0 ? 'Out of stock' : 'In stock'}</p>
                    <p>Description: {product.productDescription}</p>
                    <button disabled={product.productQty <= 0} onClick={() => dispatch(addToCart(product))} >Add To Cart</button>
                </div>
                <div className='product_butons'>

                </div>
            </div>}
        </div>

    )
}

export default Product
