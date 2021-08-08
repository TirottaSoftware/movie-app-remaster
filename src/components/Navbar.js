import React from 'react'

function Navbar() {
    return (
        <nav>
            <div className = 'burger-circle'>
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
