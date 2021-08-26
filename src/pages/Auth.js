import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import Logo from '../LOGO_TMA.png'

function Auth(props) {
    return (
        <>
        <div className = 'auth-logo'>
            <img src = {Logo}/>
        </div>
        <div className = 'auth-page'>
            <Login login = {props.login} />
            <br></br>
            <Register register = {props.register} />
        </div>
        </>
    )
}

export default Auth