import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserProfile(props) {

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('https://tirottas-movie-app.herokuapp.com/auth/profile/' + props.uid, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then(res => {
            setUser(res.data);
            setUsername(res.data.username);
            setEmail(res.data.email)
            setProfilePicture(res.data.profilePictureURL)
        })
    }, [])

    //Profile Data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const [profileDataErrorMessage, setProfileDataErrorMessage] = useState('');

    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value)
    }
    const handleEmailChange = (e) => {
        e.preventDefault();

        setEmail(e.target.value)
    }
    const handleProfilePictureChange = (e) => {
        e.preventDefault();

        setProfilePicture(e.target.value)
    }

    const handleDataChange = (e) => {
        e.preventDefault();

        if(!username || !email || !profilePicture){
            setProfileDataErrorMessage('Fields cannot be empty');
            return;
        }
        axios.put('https://tirottas-movie-app.herokuapp.com/profile', {
            id: props.uid,
            username: username,
            email: email,
            profilePic: profilePicture
        })
        .then(res => {
            if(res.data.error){
                setProfileDataErrorMessage(res.data.error)
                return;
            }
            localStorage.setItem('accessToken', res.data.accessToken);
            window.location.reload();
        })
    }

    const deleteUser = () => {
        console.log(props.uid)
        if (window.confirm("Are you sure you want to delete your account. This action is irrevirsible")) {
          axios.put('https://tirottas-movie-app.herokuapp.com/profile/delete', {id: props.uid})
          .then(() => {
              localStorage.removeItem('accessToken');
              window.location.reload();
          })
        } 
    }

    //Change Password

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [pwdErrorMessage, setPwdErrorMessage] = useState('');

    const handleCurrentPasswordChange = (e) => {
        e.preventDefault();

        setCurrentPassword(e.target.value)
    }
    const handleNewPasswordChange = (e) => {
        e.preventDefault();

        setNewPassword(e.target.value)
    }
    const handleConfirmPasswordChange = (e) => {
        e.preventDefault();

        setConfirmNewPassword(e.target.value)
    }

    const changePassword = (e) => {
        e.preventDefault();
        
        if(!currentPassword || !newPassword || !confirmNewPassword){
            setPwdErrorMessage('Fields cannot be empty');
            return;
        }

        if(newPassword === confirmNewPassword){
            if(newPassword.length >= 6){
                axios.put('https://tirottas-movie-app.herokuapp.com/profile/pwd', {id: props.uid, pwd: currentPassword, newPwd: newPassword}).then(res => {
                    if(res.data.error){
                        setPwdErrorMessage(res.data.error);
                        return;
                    }
                    else{
                        window.location.reload();
                    }
                })
            }
            else{
                setPwdErrorMessage('Password must be at least 6 characters long')
                return;
            }
        }
        else{
            setPwdErrorMessage('Passwords do not match.')
            return;
        }
    }

    return (
        <div className = 'profile-page'>
            <div className = 'avatar' style = {{backgroundImage: `url(${user.profilePictureURL})`}}></div>
            <div className = 'profile-page-section'>
                <h2>Profile Data</h2>
                <p className = 'pd-err-msg'>{profileDataErrorMessage}</p>
                <form onSubmit = {handleDataChange} >
                    <input type = 'text' placeholder = 'Username' onChange = {handleUsernameChange} value = {username}/>
                    <input type = 'text' placeholder = 'Email' value = {email} onChange = {handleEmailChange} />
                    <input type = 'text' placeholder = 'Profile Picture URL' value = {profilePicture} onChange = {handleProfilePictureChange} />
                    <button type = 'submit'>Save</button>
                </form>
            </div>
            <div className = 'profile-page-section'>
                <h2>Change Password</h2>
                <p className = 'cp-err-msg'>{pwdErrorMessage}</p>
                <form onSubmit = {changePassword}>
                    <input onChange = {handleCurrentPasswordChange} type = 'password' value = {currentPassword} placeholder = 'Current Password' />
                    <input onChange = {handleNewPasswordChange} type = 'password' value = {newPassword} placeholder = 'New Password' />
                    <input onChange = {handleConfirmPasswordChange} type = 'password' value = {confirmNewPassword} placeholder = 'Confirm New Password' />
                    <button type = 'submit'>Save</button>
                </form>
            </div>
            <div className = 'profile-page-section'>
                <h2>Danger zone</h2>
                <p>Please note that the account deletion process might take up to 28 days before it fully removes your account from our systems. We advise you to re-consider the deletion before taking action.</p>
                <button onClick = {deleteUser} className = 'btn-delete-account'>Delete Account</button>
            </div>
            <div className = 'profile-page-section'>
                <p>Account created at: {user.createdAt}</p>
                <p>Last updated at: {user.updatedAt}</p>
            </div>
        </div>
    )
}

export default UserProfile
