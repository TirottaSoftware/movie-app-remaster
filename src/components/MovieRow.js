import React from 'react';
import Movie from './Movie';
import { useHistory } from 'react-router';

function MovieRow(props) {
    const history = useHistory();

    const getMovie = (id) => {
        history.push('/movie/' + id)
    }

    return (
        <>
            <h2 className = 'row-category'>{props.category}</h2>
            <div className = 'row-section'>
                <div className = 'movie-row'>
                    {
                        props.movies.map(movie => {
                            return <Movie onClick = {() => getMovie(movie.id)} movie = {movie}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default MovieRow
