import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { signup } from '../api/auth'
import { isAuth } from '../hellpers/auth'

import './Signup.css'

function Signup() {
    const [formState, setFormState] = useState({ username: '', email: '', password: '', repeat: '', msgSuccess: false, msgError: false, loading: false })
    const { username, email, password, repeat, msgSuccess, msgError, loading } = formState
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
            msgError: '',
            msgSuccess: ''
        })
    }
    const submitForm = (e) => {
        e.preventDefault()
        if (isEmpty(username || email || password || repeat)) {
            setFormState({
                ...formState,
                msgError: 'All fields are required!'
            })
        } else if (!isEmail(email)) {
            setFormState({
                ...formState,
                msgError: 'Invalid email.'
            })
        } else if (!equals(password, repeat)) {
            setFormState({
                ...formState,
                msgError: 'Passwords do not match.'
            })
        } else {
            setFormState({ ...formState, loading: true })
            const data = { username, email, password }
            signup(data).then(response => {
                console.log('Axios signup success:', response)
                setFormState({ ...formState, username: '', email: '', password: '', repeat: '', loading: false, msgSuccess: response.data.msgSuccess })
                //successMessage - ce biti custom poruka generisana iz backenda
            }).catch(err => {
                console.log('Axios signup error:', err)
                setFormState({ ...formState, loading: false, msgError: err.response.data.errorMessage })
            })
        }

    }
    return (
        <div className="container">
            <form onSubmit={submitForm}>
                {msgError && <div className="alert">
                    <span className="closebtn">&times;</span>
                    <strong>{msgError}</strong>
                </div>}
                {msgSuccess && <div className="alert success">
                    <span className="closebtn">&times;</span>
                    <strong>{msgSuccess}</strong>
                </div>}
                {loading && <div className="loader"></div>}
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="username">User Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="username" name="username" value={username} placeholder="Your user name.." onChange={handleChange} />
                    </div>
                </div>
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
                    <div className="col-25">
                        <label htmlFor="repeat">Repeat password</label>
                    </div>
                    <div className="col-75">
                        <input type="password" id="repeat" name="repeat" value={repeat} placeholder="Repeat password..." onChange={handleChange} />
                    </div>
                </div>

                <div className="row">

                    <input type="submit" value="Submit" />
                </div>
                <div className='bottom'>

                    <p>Have an acount already?<Link to='/signin'>Login</Link></p>
                </div>

            </form>


        </div>

    )
}

export default Signup
