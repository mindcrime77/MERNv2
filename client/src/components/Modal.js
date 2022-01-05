import React, { useState } from 'react'
import isEmpty from 'validator/lib/isEmpty';
import './Modal.css'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { createCategory } from '../redux/actions/categoryActions'
import { clearMessages } from '../redux/actions/messageActions'


function Modal({

    setToggle,
    setToggleHistory,
    modalFood = false,
    modalHistory = false
}) {

    const dispatch = useDispatch()
    const { msgSuccess, msgError } = useSelector(state => state.messages)
    const { loading } = useSelector(state => state.loading)
    const { usercart } = useSelector(state => state.usercart)

    const [category, setCategory] = useState('')
    const [clientSideErrorMsg, setclientSideErrorMsg] = useState('')

    const close = () => {
        setToggle(false)
        dispatch(clearMessages())


    }


    const handleCategoryChange = (item) => {
        setCategory(item)
        dispatch(clearMessages())
    }

    const handleSubmitCategory = () => {

        if (isEmpty(category)) {
            setclientSideErrorMsg('Category is empty!')
        } else {
            dispatch(createCategory({ category }))
            setCategory('')

        }

    }



    return (
        <div id="myModal" className="modal" style={{ display: 'block' }}>

            {modalHistory && <div className="modal-content">
                <div className='modal-history title'>



                    <h3>History</h3>
                    <i className="material-icons" style={{ fontSize: '24px' }}
                        onClick={() => setToggleHistory(false)}
                    >close</i>


                </div>
                <div className='usercart-section'>
                    {usercart && usercart.map(item => <div className='usercart' key={item._id}>
                        <p id='created'>{item.createdAt.split('.')[0].replace('T', ' ')}</p>
                        <div className='usercart-data'>
                            {item.cartList.map(item => <div key={item._id} className='usercart-p'>
                                <p>{item.productName}</p>
                                <p>{item.count}</p>
                            </div>)}
                        </div>
                    </div>)}
                </div>
            </div>}
            {modalFood && <div className="modal-content">
                <div className='title'>

                    <h3>Add Category</h3>
                    <i className="material-icons" style={{ fontSize: '24px' }}
                        onClick={close}
                    >close</i>
                </div>
                {clientSideErrorMsg && <div className="alert">

                    <strong>{clientSideErrorMsg}</strong>
                </div>}
                {msgError && <div className="alert">

                    <strong>{msgError}</strong>
                </div>}
                {msgSuccess && <div className="alert success" >

                    <strong>{msgSuccess}</strong>
                </div>}
                {loading ? (<div className="loader"></div>)
                    : (

                        <div className='category'>
                            <p>Category</p>
                            <input type='text' value={category} onChange={(e) => handleCategoryChange(e.target.value)} />
                        </div>
                    )}
                <div className='modal-buttons'>
                    <button className="button-12" onClick={close}>Close</button>
                    <button className="button-12"
                        onClick={handleSubmitCategory}
                    >Submit</button>
                </div>

            </div>}

        </div>
    )
}

export default Modal
