import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeRole } from '../redux/actions/userActions'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import './AdminUser.css'

function AdminUser({ user }) {
    const dispatch = useDispatch()
    const [adminEmail, setAdminEmail] = useState(user.email)
    const [toggleEmail, setToggleEmail] = useState(true)

    const [adminUser, setAdminUser] = useState(user.username)
    const [toggleUser, setToggleUser] = useState(true)

    const [toggle, setToggle] = useState(user.role === 1 ? true : false)
    const toggleRadio = (e) => {
        setToggle(!toggle)

    }

    const handleUser = () => {
        !isEmpty(adminUser.trim()) && setToggleUser(!toggleUser)
    }

    const handleEmail = () => {
        isEmail(adminEmail) && setToggleEmail(!toggleEmail)
    }

    const submitChange = () => {

        dispatch(changeRole(user._id, { username: adminUser, email: adminEmail, role: toggle }))
    }

    return (
        <tr>
            <td>
                <p onClick={() => setToggleUser(!toggleUser)} style={{ display: toggleUser ? '' : 'none' }}>{adminUser}</p>
                <div className='admin-user' style={{ display: toggleUser ? 'none' : 'flex' }}>
                    <input type='text' onChange={(e) => setAdminUser(e.target.value)} onKeyDown={(e) => {
                        e.key === 'Escape' && setToggleUser(!toggleUser)
                    }} />
                    <i className="material-icons" style={{ fontSize: '24px' }} onClick={handleUser}>done</i>
                </div>
            </td>
            <td>
                <p onClick={() => setToggleEmail(!toggleEmail)} style={{ display: toggleEmail ? '' : 'none' }}>{adminEmail}</p>
                <div className='admin-user' style={{ display: toggleEmail ? 'none' : 'flex' }}>
                    <input type='text' onChange={(e) => setAdminEmail(e.target.value)} onKeyDown={(e) => {
                        e.key === 'Escape' && setToggleEmail(!toggleEmail)
                    }} />
                    <i className="material-icons" style={{ fontSize: '24px' }} onClick={handleEmail}>done</i>
                </div>
            </td>
            <td>
                <input type='radio' value={user.role} checked={toggle} onClick={toggleRadio} />

            </td>
            <td>

                <button onClick={submitChange} disabled={!toggleUser || !toggleEmail} style={{ color: !toggleUser || !toggleEmail ? 'red' : '' }}>Change</button>
            </td>
        </tr>
    )
}

export default AdminUser
