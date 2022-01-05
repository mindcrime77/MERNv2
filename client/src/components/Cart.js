import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { ADD_TO_CART } from '../redux/constants/cartConstants'
import { delFromCart, saveCart, userCart } from '../redux/actions/cartActions'
import { clearMessages } from '../redux/actions/messageActions'
import './Cart.css'
function Cart() {
    const { cart } = useSelector(state => state.cart)
    const { msgSuccess, msgError } = useSelector(state => state.messages)
    const { usercart } = useSelector(state => state.usercart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCartQty = (e, product) => {

        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

        cart.forEach(item => {
            if (item._id === product._id) {
                item.count = e.target.value
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart))

        dispatch({
            type: ADD_TO_CART,
            payload: cart
        })

    }

    useEffect(() => {
        dispatch(userCart((JSON.parse(localStorage.getItem('user'))._id)))
    }, [dispatch])

    return (
        <section>
            <div id="mySidenav" className="sidenav">
                <a href="#" className="closebtn" onClick={() => {
                    document.getElementById("mySidenav").style.width = "0px";
                }}>&times;</a>

                {usercart && usercart.map(item => <div className='history-wrapper' key={item._id}>
                    <p>{item.createdAt.split('.')[0].replace('T', ' ')}</p>
                    <div>
                        {item.cartList.map(item => <div className='usercart-p'>
                            <p>{item.productName}</p>
                            <p>{item.count}</p>
                        </div>)}
                    </div>
                </div>)}

            </div>
            <div className="jumbotron">
                <div className='jumbotron_container'>
                    {cart.length > 0 ? <h1>Cart</h1> : <h1>The cart is empty</h1>}
                </div>
            </div>
            {cart.length === 0 && <div className='cart-buttons'>
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/shop')}>Shop</button>
            </div>}
            {cart.length > 0 && <div className='cart'>

                <div>

                    <div style={{ overflowX: 'auto' }}>
                        <button onClick={() => navigate(-1)}>Back</button>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Remove</th>

                                </tr>
                                {cart.map(product => (
                                    <tr key={product._id}>
                                        <td>
                                            <img src={`/uploads/${product.fileName}`} />
                                        </td>
                                        <td>
                                            <Link to={`/product/${product._id}`}>
                                                {product.productName}
                                            </Link>
                                        </td>
                                        <td>
                                            <p>{product.productPrice.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            })}</p>
                                        </td>
                                        <td>
                                            <input type='number' value={product.count} min='1' max={product.productQty} onChange={(e) => handleCartQty(e, product)} />
                                        </td>
                                        <td>
                                            <button onClick={() => dispatch(delFromCart(product))}>
                                                <i className="material-icons" style={{ fontSize: '24px' }}>delete_forever</i>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </thead>
                        </table>
                    </div>
                </div>
                <div>
                    <div className='cart-history'>
                        <h1>
                            Cart summary
                        </h1>
                        <i className="material-icons" style={{ fontSize: "36px" }} onClick={
                            () => {
                                document.getElementById("mySidenav").style.width = "33%";
                            }
                        }>reorder</i>
                    </div>

                    <p>
                        {cart.length === 1 ? '(1) Item' : `(${cart.length}) Items`}
                    </p>
                    <p>
                        Total: ${cart.reduce((currentSum, currentItem) => currentSum += currentItem.count * currentItem.productPrice, 0).toFixed(2)}
                    </p>
                    <button onClick={() => {
                        dispatch(saveCart(cart))
                        dispatch(userCart((JSON.parse(localStorage.getItem('user'))._id)))
                        setTimeout(() => {
                            dispatch(clearMessages())
                        }, 1500)
                    }}>SAVE</button>
                    {msgSuccess && <p style={{ color: 'green' }}>{msgSuccess}</p>}
                    {msgError && <p style={{ color: 'red' }}>{msgError}</p>}
                </div>
            </div>}
        </section>
    )
}

export default Cart


