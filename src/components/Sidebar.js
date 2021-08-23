import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContext';

function Sidebar(props) {
    const { authState } = useContext(AuthContext);

    const toggleSidebar = () => {
        props.toggleSidebar();
    }

    const logout = () => {
        props.toggleSidebar();
        props.logout();
    }

    return (
        <div className = {props.active?'sidebar sidebar-active':'sidebar'}>
            <div className = 'profile-pic' style = {{backgroundImage: `url(${authState.user.profilePictureURL})`}}></div>
            <h2>Welcome back, {authState.user.username}</h2>

            <div className = 'sidebar-links'>
                <ul>
                    <Link onClick = {toggleSidebar} to = '/'><li className = 'sidebar-link'>Home</li></Link>
                    <Link onClick = {toggleSidebar} to = '/list'><li className = 'sidebar-link'>My List</li></Link>
                    <Link onClick = {toggleSidebar} to = '/profile'><li className = 'sidebar-link'>Profile</li></Link>
                    <Link onClick = {logout} to = '/'><li className = 'sidebar-link'>Logout</li></Link>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar