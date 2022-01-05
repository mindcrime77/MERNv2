import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Signup.css'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { signin } from '../api/auth'
import { setAuth, isAuth } from '../hellpers/auth'


function Signin() {

    const [formState, setFormState] = useState({ email: '', password: '', msgError: false, loading: false })
    const { email, password, msgError, loading } = formState
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuth() && isAuth().role === 1) {

            navigate('/admin/dashboard')
        } else if (isAuth() && isAuth().role === 0) {

            navigate('/user/dashboard')
        }
    }, [navigate])



    const handleChange = (e) => {

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
            msgError: ''

        })
    }
    const submitForm = (e) => {
        e.preventDefault()
        if (isEmpty(email || password)) {
            setFormState({
                ...formState,
                msgError: 'All fields are required!'
            })
        } else if (!isEmail(email)) {
            setFormState({
                ...formState,
                msgError: 'Invalid email.'
            })
        } else {
            setFormState({ ...formState, loading: true })
            const data = { email, password }
            signin(data).then(response => {
                console.log('Axios signin success:', response)
                const { token, user } = response.data
                setAuth(token, user)
                if (isAuth() && isAuth().role === 1) {
                    console.log('Redirecting to  admin dashboard')
                    navigate('/admin/dashboard')
                } else {
                    console.log('Redirecting to  user dashboard')
                    navigate('/user/dashboard')
                }
                setFormState({ ...formState, email: '', password: '', loading: false })

            }).catch(err => {
                console.log('Axios sigin error:', err)
                setFormState({ ...formState, loading: false, msgError: err.response.data.errorMessage })
            })
        }
    }

    return (
        <div className="signin-container">
            <form onSubmit={submitForm} noValidate>
                {msgError && <div className="alert">

                    <strong>{msgError}</strong>
                </div>}

                {loading && <div className="loader"></div>}

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="email" name="email" value={email} placeholder="Your email" onChange={handleChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="col-75">
                        <input type="password" id="password" name="password" value={password} placeholder="Your password..." onChange={handleChange} />
                    </div>
                </div>



                <div className="row">

                    <input type="submit" value="Signin" />
                </div>

                <div className='bottom'>

                    <p>Do not have an acount?<Link to='/signup'>Register here</Link></p>
                </div>

            </form>


        </div>

    )
}

export default Signin
