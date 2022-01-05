import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { readAllProducts } from '../redux/actions/productActions'
import { categoryAction } from '../redux/actions/categoryActions'
import { getProductsByFilter } from '../redux/actions/arrivalActions'

import './Shop.css'
//import { NEW_ARRIVALS } from '../redux/constants/newArrivals'
const Shop = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [categoryIds, setCategoryIds] = useState([])
    useEffect(() => {
        dispatch(readAllProducts())
    }, [dispatch])
    useEffect(() => {
        dispatch(categoryAction())
    }, [dispatch])

    const { products } = useSelector(state => state.products)
    const { categories } = useSelector(state => state.categories)

    const handleTextChange = (e) => {
        resetState()
        e.preventDefault()

        setText(e.target.value)
        dispatch(getProductsByFilter({ type: 'text', query: e.target.value }))
    }

    const handleCategoryIds = (e) => {
        resetState()
        const currentCategoryChecked = e.target.value
        const allCategoriesCheked = [...categoryIds]
        const indexFound = allCategoriesCheked.indexOf(currentCategoryChecked)

        let updatedCategoryIds;
        if (indexFound === -1) {
            updatedCategoryIds = [...categoryIds, currentCategoryChecked]
            setCategoryIds(updatedCategoryIds)
        } else {
            updatedCategoryIds = [...categoryIds]
            updatedCategoryIds.splice(indexFound, 1)
            setCategoryIds(updatedCategoryIds)
        }
        dispatch(getProductsByFilter({ type: 'category', query: updatedCategoryIds }))
    }

    const resetState = () => {
        setText('')
        setCategoryIds([])
    }

    return (
        <section>

            <div className="jumbotron">
                <div className="jumbotron_container">
                    <h1>Shop</h1>
                </div>
            </div>
            <div className='jumbotron_row'>
                <div className='jumbotron_row_filters'>
                    <h3>Filters</h3>

                    <div className="jumbotron_search">
                        <form>
                            <input type="text" placeholder="Search.." name="search" value={text} onChange={handleTextChange} />
                            <button type="submit" disabled={true}><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                    <div className='jumbotron_checkbox'>
                        {categories && categories.map(c => <div key={c._id}>
                            <input type="checkbox" value={c._id} name='category' onChange={handleCategoryIds} checked={categoryIds.includes(c._id)} />
                            <label>{c.category}</label>
                        </div>)}

                    </div>
                </div>
                <div className='jumbotron_row_products'>
                    {products && products.map(p => <Card key={p._id} product={p} homePage={true} />)}
                </div>
            </div>
        </section>

    )
}
export default Shop
