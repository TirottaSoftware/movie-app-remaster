import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import axios from 'axios';
import MovieComponent from '../components/Movie';

function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [trailerKey, setTrailerKey] = useState('');
    const [recommendations, setRecommendations] = useState('')
    const history = useHistory();

    useEffect(() => {
        const api = `https://api.themoviedb.org/3/movie/${id}?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos`;
        const recommendationsApi = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos`;

        axios.get(api).then(res => {
            if(res.data.videos.results.length > 0){
                setTrailerKey(res.data.videos.results[0].key)
            }
            console.log(res.data);
            setMovie(res.data)
        })
        axios.get(recommendationsApi).then(res => {
            setRecommendations(res.data.results.slice(0, 9));
        })
    }, [])

    const getMovie = (id) => {
        history.push('/movie/' + id);
        window.location.reload();
    }

    const getHomePage = () => {
        history.push('/')
    }

    return (
        <div className = 'movie-page'>
            {
                trailerKey?
                <iframe className = 'trailer' src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&mute=1`} frameborder="0" allow="accelerometer; autoPlay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                :<h3 className = 'trailer-error'>Trailer not available.</h3>
            }
            <div className = 'movie-info-main'>
                <h1>{movie.title}</h1>
                {movie.genres&&<h3>{
                movie.genres.length > 1?
                `${movie.genres[0].name}, ${movie.genres[1].name}  ${movie.release_date}`:
                `${movie.genres[0].name}  ${movie.release_date}`}</h3>}
            </div>
            
            <button onClick = {getHomePage}>Back to Movies</button>
            <button className = 'btn-grey'>+ My List</button>
            <p>{movie.overview}</p>

            <h2>People also like</h2>
            <div className = 'similar-movies'>
                {
                    recommendations&&recommendations.map(m => {
                        return <MovieComponent onClick = {() => getMovie(m.id)} movie = {m}/>
                    })
                }
            </div>
        </div>
    )
}

export default Movie
