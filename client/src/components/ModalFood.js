import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { categoryAction } from '../redux/actions/categoryActions'
import { createProduct } from '../redux/actions/productActions'
import { clearMessages } from '../redux/actions/messageActions'
//import { readAllProducts } from '../redux/actions/productActions'
import isEmpty from 'validator/lib/isEmpty';


import './Modal.css'
function ModalFood({
    setToggleFood,
}) {
    const [foodState, setFoodState] = useState({
        foodImage: null,
        foodName: '',
        foodDescr: '',
        foodPrice: '',
        foodCategory: '',
        foodQty: ''
    })
    const [clientSideError, setClientSideError] = useState('')

    const { foodImage, foodName, foodDescr, foodCategory, foodPrice, foodQty } = foodState
    const dispatch = useDispatch()



    const { categories } = useSelector(state => state.categories)
    const { msgSuccess, msgError } = useSelector(state => state.messages)


    const handleFoodChange = (item) => {
        setFoodState({
            ...foodState,
            [item.target.name]: item.target.value
        })


    }

    const handleFoodImage = item => {

        //console.log(item.target.files[0])
        setFoodState({
            ...foodState,
            [item.target.name]: item.target.files[0]
        })

    }

    const handleSubmitFood = (foodImage, foodName, foodDescr, foodPrice, foodCategory, foodQty) => {

        if (foodImage === null) {
            setClientSideError('No image selected...')
        } else if (isEmpty(foodName) || isEmpty(foodDescr) || isEmpty(foodPrice)) {
            setClientSideError('All fields required...')
        } else if (isEmpty(foodCategory)) {
            setClientSideError('Please select category...')
        }
        else if (isEmpty(foodQty)) {
            setClientSideError('Please select quantity...')
        } else {
            //success
            const formData = new FormData()
            formData.append('foodImage', foodImage)
            formData.append('foodName', foodName)
            formData.append('foodDescr', foodDescr)
            formData.append('foodPrice', foodPrice)
            formData.append('foodCategory', foodCategory)
            formData.append('foodQty', foodQty)

            dispatch(createProduct(formData))
            setFoodState({
                foodImage: null,
                foodName: '',
                foodDescr: '',
                foodPrice: '',
                foodCategory: '',
                foodQty: ''
            })
        }
    }



    return (
        <div id="myModal" className="modal" style={{ display: 'block' }}>


            <div className="modal-content">

                <div className='title'>

                    <h3>Add Food</h3>

                    <i className="material-icons" style={{ fontSize: '24px' }}
                        onClick={() => {
                            setToggleFood(false)
                            dispatch(clearMessages())
                        }}
                    >close</i>
                </div>
                {clientSideError && <div className="alert">

                    <strong>{clientSideError}</strong>
                </div>}
                {msgError && <div className="alert">

                    <strong>{msgError}</strong>
                </div>}
                {msgSuccess && <div className="alert success" >

                    <strong>{msgSuccess}</strong>
                </div>}

                <div>



                    <input type="file" id="myfile"
                        name="foodImage"
                        onChange={(e) => handleFoodImage(e)}
                    />




                </div>
                <div>
                    <p>Name</p>
                    <input type='text' name='foodName' value={foodName} onChange={(e) => handleFoodChange(e)} />
                </div>
                <div>
                    <p>Description</p>
                    <textarea rows='3' name='foodDescr' value={foodDescr} onChange={(e) => handleFoodChange(e)}></textarea>
                </div>
                <div>
                    <p>Price</p>
                    <input type='text' name='foodPrice' value={foodPrice} onChange={(e) => handleFoodChange(e)} />
                </div>
                <div className='cat'>
                    <div className='cat_1'>
                        <p>Category</p>
                        <select name='foodCategory' onChange={(e) => handleFoodChange(e)}>
                            <option value=''>Choose one...</option>
                            {categories && categories.map((item) => (<option key={item._id} value={item._id}>{item.category}</option>))}

                        </select>
                    </div>
                    <div className='cat_2'>
                        <p>Qty:</p>
                        <input type='number' min='0' max='1000' name='foodQty' value={foodQty} onChange={(e) => handleFoodChange(e)} />
                    </div>
                </div>
                <div className='modal-buttons'>

                    <button className="button-12" onClick={() => {
                        setToggleFood(false)
                        dispatch(clearMessages())
                    }}>Close</button>
                    <button className="button-12" type='submit' onClick={(e) => {
                        e.preventDefault()
                        handleSubmitFood(foodImage, foodName, foodDescr, foodPrice, foodCategory, foodQty)

                    }}

                    >Submit</button>

                </div>

            </div>

        </div>
    )
}

export default ModalFood
