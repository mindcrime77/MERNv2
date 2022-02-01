import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../redux/actions/userActions'
import AdminUser from './AdminUser'
import './AdminUser.css'

const Administration = () => {

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])


    return (
        <div>

            <div className='admin-table'>

                <table>
                    <tbody>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        {users.map(user => <AdminUser user={user} key={user._id} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Administration
