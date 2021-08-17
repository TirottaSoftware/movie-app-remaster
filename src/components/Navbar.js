import React from 'react'

function Navbar(props) {
    return (
        <nav>
            <div onClick = {props.toggleSidebar} className = 'burger-circle'>
                <div className = 'burger'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className = 'search-bar'>
                <input type = 'text' />
                <div className = 'search-icon'></div>
            </div>
        </nav>
    )
}

export default Navbar
