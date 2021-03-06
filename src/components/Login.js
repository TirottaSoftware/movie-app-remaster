import React, {useState} from 'react'

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(!username || !password){
            setLoginErrorMessage('Please fill in all the required fields.')
            return;
        }
        props.login(username, password)
    }

    return (
        <form onSubmit = {handleFormSubmit} className = 'login-form'>
        <h2>Login</h2>
            <p className = 'error-msg'>{loginErrorMessage}</p>
                <input className = "login-input" onChange = {handleUsernameChange} placeholder = 'Username' value = {username} type = 'text' />
                <input className = "login-input" onChange = {handlePasswordChange} placeholder = 'Password' value = {password} type = 'password' />
            <input type = 'submit' value = 'Sign In' />
        </form>
    )
}

export default Login