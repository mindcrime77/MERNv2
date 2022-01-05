import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNewArrivals } from '../redux/actions/arrivalActions'
import { readAllProductsByCount } from '../redux/actions/productActions'

import Card from './Card'
import './Home.css'
function Home() {
    const dispatch = useDispatch()
    const { newArrivals } = useSelector(state => state.filters)
    const { products } = useSelector(state => state.products)
    const { loading } = useSelector(state => state.loading)
    useEffect(() => {
        dispatch(getNewArrivals('desc', 3))

    }, [dispatch])
    useEffect(() => {
        dispatch(readAllProductsByCount())
    }, [dispatch])
    return (
        <section className='home-page'>
            <div className='banner-img'>

            </div>
            <div>
                {loading && <div className="loader"></div>}
                <h1>New Arrivals</h1>
                <div className='arrivals'>

                    {newArrivals && newArrivals.map(arrival => <Card key={arrival._id} product={arrival} homePage={true} />)}
                </div>

                <h1>Menu</h1>
                <div className='arrivals'>

                    {products && products.map(product => <Card key={product._id} product={product} homePage={true} />)}
                </div>
            </div>
        </section>
    )
}

export default Home
