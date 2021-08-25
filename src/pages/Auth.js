import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

function Auth(props) {
    return (
        <>
        <h1 className = 'page-title'>Tirotta's Movie App</h1>
        <div className = 'auth-page'>
            <Login login = {props.login} />
            <br></br>
            <Register register = {props.register} />
        </div>
        </>
    )
}

export default Auth
