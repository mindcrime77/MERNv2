import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { useDispatch } from 'react-redux'
import { categoryAction } from '../redux/actions/categoryActions'
import { readAllProducts } from '../redux/actions/productActions'
import { userCart } from '../redux/actions/cartActions'

import './AdminDashboard.css'
import ModalFood from './ModalFood';
import AdminBody from './AdminBody';



function AdminDashobard() {

    const dispatch = useDispatch()




    useEffect(() => {


        dispatch(categoryAction())
        dispatch(readAllProducts())
        dispatch(userCart((JSON.parse(localStorage.getItem('user'))._id)))
    }, [dispatch])




    const [toggleFood, setToggleFood] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [toggleHistory, setToggleHistory] = useState(false)

    return (
        <div className='dashboard'>
            <div className='dashboard_navbar'>
                <div className='dashboard_left'>
                    <i className="material-icons" style={{ fontSize: '36px' }}>public</i>
                    <h1>
                        Dashboard
                    </h1>
                </div>
                {localStorage.getItem('user') && <h1>Welcome {JSON.parse(localStorage.getItem('user')).username}</h1>}
            </div>
            <div className='dashboard_buttons'>
                <button className="button-16" onClick={() => setToggle(true)}>+ Add Category</button>
                {toggle && <Modal
                    toggle={toggle} setToggle={setToggle}
                    modalFood={true}

                />}
                <button className="button-16" onClick={() => setToggleFood(true)}>+ Add Food</button>
                {toggleFood && <ModalFood
                    setToggleFood={setToggleFood}




                />}
                <button className="button-16" onClick={() => {

                    setToggleHistory(true)

                }} >Cart History</button>
                {toggleHistory && <Modal
                    toggleHistory={toggleHistory}
                    setToggleHistory={setToggleHistory}
                    modalHistory={true}

                />}
            </div>
            <AdminBody />
        </div>
    )
}

export default AdminDashobard
