import React, { useState } from 'react'
import './UserDashboard.css'

function UserDashboard() {
    const test = 'Page under construction...'
    const [text, setText] = useState([...test])

    return (
        <>
            <div className='dashboard_navbar'>
                <div className='dashboard_left'>
                    <i className="material-icons" style={{ fontSize: '36px' }}>public</i>
                    <h1>
                        Dashboard
                    </h1>
                </div>
                {localStorage.getItem('user') && <h1>Welcome {JSON.parse(localStorage.getItem('user')).username}</h1>}
            </div>
            <div className='user-wrapper'>
                <div className='user-circle'>
                    <div className='user-logo'></div>
                    <div className='user-text'>
                        <p>{text.map((letter, i) => <span key={i} style={{ transform: `rotate(${i * 8.2}deg)` }}>{letter}</span>)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDashboard
