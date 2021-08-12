import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';

function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [trailerKey, setTrailerKey] = useState('')

    useEffect(() => {
        const api = `https://api.themoviedb.org/3/movie/${id}?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos`;

        axios.get(api).then(res => {
            if(res.data.videos.results[0].key){
                setTrailerKey(res.data.videos.results[0].key)
            }
            setMovie(res.data)
        })
    }, [])

    return (
        <div className = 'movie-page'>
            {console.log(movie.genres)}
            <iframe className = 'trailer' src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`} frameborder="0" allow="accelerometer; autoPlay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div className = 'movie-info-main'>
                <h1>{movie.title}</h1>
                <h3>{movie.genres&&movie.genres[0].name + ', ' + movie.genres[1].name} {movie.release_date}</h3>
            </div>
            
            <button>+ My List</button>
            <button className = 'btn-grey'>Watch Trailer</button>
            <p>{movie.overview}</p>

            <h2>People also like</h2>
            <div className = 'similar-movies'>

            </div>
        </div>
    )
}

export default Movie
