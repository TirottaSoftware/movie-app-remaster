import React from 'react'

function Sidebar(props) {
    return (
        <div className = {props.active?'sidebar sidebar-active':'sidebar'}>
            <div className = 'profile-pic'></div>
            <h2>Welcome back, user123</h2>

            <div className = 'sidebar-links'>
                <ul>
                    <li>Home</li>
                    <li>My List</li>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
