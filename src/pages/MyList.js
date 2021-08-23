import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import {AuthContext} from '../AuthContext';
import Movie from '../components/Movie';

function MyList(props) {
    const [movies, setMovies] = useState([]);
    const { authState } = useContext(AuthContext);
    const history = useHistory();

    const getMovie = (id) => {
        history.push('/movie/' + id)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/auth/movies', {
             headers: {accessToken: localStorage.getItem('accessToken')}
            })
            .then(res => {
                console.log(res.data)
                setMovies(res.data);
            })
    }, [])

    return (
        <div className = "my-list-container">
            <h1>My List</h1>
            <div className = 'movies-container'>
                {
                    movies.map(movie => {
                        return <Movie onClick = {() => getMovie(movie.movieId)} movie = {movie} />
                    })
                }
            </div>
        </div>
    )
}

export default MyList