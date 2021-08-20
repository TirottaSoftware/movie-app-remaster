import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';

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

    return (
        <nav>
            <div onClick = {props.toggleSidebar} className = 'burger-circle'>
                <div className = 'burger'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <form onSubmit = {handleSubmit} className = 'search-box'>
                <input value = {searchTerm} onChange = {handleInputChange} type = 'text' />
                <button type = 'submit' className = 'search-icon'><FontAwesomeIcon icon={faSearch} /></button>
            </form>
        </nav>
    )
}

export default Navbar
