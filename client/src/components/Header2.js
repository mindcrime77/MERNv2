import React, { useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuth, logout } from '../hellpers/auth'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../redux/actions/cartActions'
import './Header2.css'
function Header2() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const [toggle, setToggle] = useState(true)

    const handleLogout = e => {
        dispatch(emptyCart())
        logout(() => {
            navigate('/signin')

        })
    }

    return (
        <ul className="grid">

            <div className="grid_1">



                <li><Link to="/">Logo</Link></li>

            </div>

            <div className={toggle ? 'grid_2' : 'grid_22'}>



                <Fragment>

                    {isAuth() && isAuth().role === 0 && <>
                        <li>
                            <Link to="/">
                                <i className="fa fa-university" style={{ fontSize: '24px' }}></i><p>Home</p>

                            </Link>
                        </li>
                        <li>
                            <Link to="/shop">
                                <i className="material-icons" style={{ fontSize: '24px' }}>shop</i> <p>Shop</p>

                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <i className="material-icons" style={{ fontSize: '24px' }}>shopping_cart</i><p className='custom_badge'>Cart <span>{cart.length}</span></p>

                            </Link>
                        </li>
                    </>}

                    {!isAuth() && <>
                        <li>
                            <Link to="/signin">
                                <i className="fa fa-sign-in" style={{ fontSize: '24px' }}></i> <p>SignIn</p>

                            </Link>
                        </li>

                        <li>
                            <Link to="/signup">
                                <i className="material-icons" style={{ fontSize: '24px' }}>open_in_new</i>  <p>SignUp</p>

                            </Link>
                        </li>
                    </>}
                </Fragment>

                {isAuth() && (
                    <Fragment>

                        <li>
                            <Link to={isAuth().role === 1 ? "/admin/dashboard" : "/user/dashboard"}>
                                <i className="fa fa-envira" style={{ fontSize: '24px' }}></i> Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link to='/admin/administration'>
                                <i className="fa fa-envira" style={{ fontSize: '24px' }}></i> Administration
                            </Link>
                        </li>

                        <li>

                            <button onClick={handleLogout}>
                                <i className="fa fa-mail-reply" style={{ fontSize: '24px' }}></i> Logout

                            </button>
                        </li>
                    </Fragment>

                )}

            </div>

            <div className="grid_3">



                <li>
                    <a href="#" style={{ fontSize: '15px' }} className="icon" onClick={() => setToggle(!toggle)}>&#9776;</a>
                </li>

            </div>

        </ul>
    )
}

export default Header2
