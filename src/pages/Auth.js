import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

function Auth(props) {
    return (
        <div className = 'auth-page'>
            <Login login = {props.login} />
            <br></br>
            <Register register = {props.register} />
        </div>
    )
}

export default Auth
