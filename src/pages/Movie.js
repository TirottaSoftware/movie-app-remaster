import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router'
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import MovieComponent from '../components/Movie';

function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [trailerKey, setTrailerKey] = useState('');
    const [recommendations, setRecommendations] = useState('')
    const [inList, setInList] = useState(false);
    const history = useHistory();

    const {authState} = useContext(AuthContext);

    useEffect(() => {
        const api = `https://api.themoviedb.org/3/movie/${id}?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos`;
        const recommendationsApi = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a8ddc54a46d9633a6500259806fbe193&append_to_response=videos`;

        axios.get(api).then(res => {
            if(res.data.videos.results.length > 0){
                setTrailerKey(res.data.videos.results[0].key)
            }
            setMovie(res.data);
            axios.get('https://tirottas-movie-app.herokuapp.com/auth/movies', {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            })
            .then(list => {
                list.data.map(movie => {
                    if(movie.movieId == res.data.id){
                        setInList(true)
                    }
                })
            })
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

    const removeFromList = () => {
        axios.delete('https://tirottas-movie-app.herokuapp.com/auth/movies/' + movie.id).then(res => {
            setInList(false);
        })
    }

    const addToList = () => {
        axios.post('https://tirottas-movie-app.herokuapp.com/auth/movies', {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              userId: authState.user.uid
          })
        .then(() => {
            setInList(true)
        })
    }

    return (
        <div className = 'movie-page'>
            {
                trailerKey?
                <iframe className = 'trailer' src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&mute=0`} frameborder="0" allow="accelerometer; autoPlay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                :<h3 className = 'trailer-error'>Trailer not available.</h3>
            }
            <div className = 'movie-info-main'>
                <h1>{movie.title}</h1>
                {movie.genres&&<h3>{
                movie.genres.length > 1?
                `${movie.genres[0].name}, ${movie.genres[1].name}  ${movie.release_date}`:
                `${movie.genres[0].name}  ${movie.release_date}`}</h3>}
            </div>
            
            <div className = 'movie-page-buttons'>
                <button onClick = {getHomePage}>Back to Movies</button>
                <button onClick = {inList?removeFromList:addToList} className = 'btn-grey'>{inList?'Remove from MyList':'+ My List'}</button>
            </div>
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
