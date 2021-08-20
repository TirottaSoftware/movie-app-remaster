import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Movie from '../components/Movie';
import axios from 'axios';

function Search() {
    const {searchTerm} = useParams();
    const [results, setResults] = useState([]);
    const history = useHistory();

    const getMovie = (id) => {
        history.push('/movie/' + id)
    }

    useEffect(() => {
        const query = `https://api.themoviedb.org/3/search/movie?api_key=a8ddc54a46d9633a6500259806fbe193&language=en-US&query=${searchTerm}`
        axios.get(query).then(res => {
            setResults(res.data.results)
        })
        
    }, [])

    return (
        <div className = 'search-container'>
            {
                results.length > 0?
                results.map(movie => {
                    return <Movie onClick = {() => getMovie(movie.id)} key = {movie.id} movie = {movie}/>
                }):
                <p className = 'search-msg'>Nothing found...</p>
            }
        </div>
    )
}

export default Search
