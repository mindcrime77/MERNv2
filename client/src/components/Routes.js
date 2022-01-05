import React from 'react'
import { useRoutes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import Home from './Home'
import Notfound from './Notfound'
import Signin from './Signin'
import Signup from './Signup'
import Shop from './Shop'
import Product from './Product'
import AdminEditProduct from './AdminEditProduct'
import UserDashboard from './UserDashboard'

import { isAuth } from '../hellpers/auth'
import { Navigate } from 'react-router-dom'
import Cart from './Cart'


function Routes() {
    return useRoutes([
        { path: '/', element: isAuth() ? (<Home />) : (<Signin />) },
        { path: '/signin', element: <Signin /> },
        { path: '/signup', element: <Signup /> },
        { path: '/shop', element: isAuth() ? (<Shop />) : (<Signin />) },
        { path: '/cart', element: isAuth() ? (<Cart />) : (<Signin />) },
        { path: '/product/:id', element: <Product /> },
        { path: '/user/dashboard', element: isAuth() ? (<UserDashboard />) : (<Navigate to='/signin' />) },
        { path: '/admin/dashboard', element: isAuth() ? (<AdminDashboard />) : (<Navigate to='/signin' />) },
        { path: '/admin/edit/product/:productId', element: isAuth() ? (<AdminEditProduct />) : (<Navigate to='/signin' />) },
        { path: '*', element: <Notfound /> }

    ])
}

export default Routes
