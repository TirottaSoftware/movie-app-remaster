import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function Navbar(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!searchTerm){
            history.push('/')
        }
        else{
            history.push('/search/' + searchTerm);
            window.location.reload();
        }
    }

    const logout = () => {
        props.logout();
    }

    return (
        <nav>
            <div onClick = {props.toggleSidebar} className = 'burger-circle'>
                <div className = 'burger'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <ul>
                <Link to = '/'><li className = 'sidebar-link'>Home</li></Link>
                <Link to = '/list'><li className = 'sidebar-link'>My List</li></Link>
                <Link to = '/profile'><li className = 'sidebar-link'>Profile</li></Link>
                <Link onClick = {logout} to = '/'><li className = 'sidebar-link'>Logout</li></Link>
            </ul>
            <form onSubmit = {handleSubmit} className = 'search-box'>
                <input value = {searchTerm} onChange = {handleInputChange} type = 'text' />
                <button type = 'submit' className = 'search-icon'><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </nav>
    )
}

export default Navbar
