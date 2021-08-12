import React from 'react'

function Movie(props) {
    return (
        <div onClick = {props.onClick} style = {{backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.poster_path})`}} className = 'movie'>
        </div>
    )
}

export default Movie
