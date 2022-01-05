import React, { useEffect, useState } from 'react'
import { getProduct } from '../redux/actions/productActions'
import { categoryAction } from '../redux/actions/categoryActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminEditProduct.css'

const AdminEditProduct = () => {
    const dispatch = useDispatch()
    const { product } = useSelector(state => state.products)
    const { categories } = useSelector(state => state.categories)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (!product) {
            dispatch(getProduct(params.productId))
            dispatch(categoryAction())
        } else {
            setFileName(product.fileName)
            setProductName(product.productName)
            setProductDescription(product.productDescription)
            setProductPrice(product.productPrice)
            setProductCategory(product.productCategory)
            setProductQty(product.productQty)
        }

    }, [dispatch, product, params.productId])

    const [fileName, setFileName] = useState(null)
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productQty, setProductQty] = useState('')

    const handleImageUpload = e => {
        const image = e.target.files[0]
        setFileName(image)
    }

    const handleProductSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fileName', fileName)
        formData.append('productName', productName)
        formData.append('productDescription', productDescription)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productQty', productQty)

        await axios.put(`/api/product/${params.productId}`, formData)
            .then(res => navigate('/admin/dashboard'))
            .catch(err => console.log(err))

    }

    return (
        <div className="container_edit">
            <form onSubmit={handleProductSubmit}>
                <div className="row_edit">
                    <div className="col-25_edit">

                        <input
                            type="file"
                            name='fileName'
                            accept='images/*'
                            hidden
                            onChange={handleImageUpload}
                        />

                    </div>
                    <div className="col-75_edit">
                        {fileName &&
                            fileName.name ? (
                            <span>{fileName.name}</span>
                        ) : fileName ? (
                            <img src={`/uploads/${fileName}`} style={{ width: '100px', height: '80px' }} alt='product' />
                        ) : null
                        }

                    </div>
                </div>
                <div className="row_edit">
                    <div className="col-25_edit">
                        <label>Product Name</label>
                    </div>
                    <div className="col-75_edit">
                        <input type="text" name="productName" value={productName} onChange={e => setProductName(e.target.value)} />
                    </div>
                </div>
                <div className="row_edit">
                    <div className="col-25_edit">
                        <label >Description</label>
                    </div>
                    <div className="col-75_edit">
                        <textarea name="productDescription" value={productDescription} onChange={e => setProductDescription(e.target.value)} style={{ height: '200px' }}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25_edit">
                        <label >Product Price</label>
                    </div>
                    <div className="col-75_edit">
                        <input type="text" name="productPrice" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
                    </div>
                </div>
                <div className="row_edit">
                    <div className="col-25_edit">
                        <label >Category</label>
                    </div>
                    <div className="col-75_edit">
                        <select name="productCategory" name='productCategory' value={productCategory} onChange={e => setProductCategory(e.target.value)}>
                            <option>Choose one...</option>
                            {categories && categories.map(category => <option value={category._id} key={category._id}>{category.category}</option>)}

                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25_edit">
                        <label >Product Qty</label>
                    </div>
                    <div className="col-75_edit">
                        <input type="number"
                            name="productQty"
                            value={productQty}
                            min='0'
                            max='1000'
                            onChange={e => setProductQty(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row_edit">
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}
export default AdminEditProduct